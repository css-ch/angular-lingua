import http from 'http';
import path from 'path';

import cors from 'cors';
import express from 'express';
import getPort from 'get-port';
import WebSocket from 'ws';
import {addTranslationAction} from './actions/add-translation-action';
import {changeKeyAction} from './actions/change-key-action';
import {changeTranslationAction} from './actions/change-translation-action';
import {deleteTranslationAction} from './actions/delete-translation-action';
import {getLanguagesAction} from './actions/get-languages-action';
import {getTranslationsAction} from './actions/get-translations-action';

import {getFileWatcher} from './file';
import {ActionOptions} from './types/action-options';
import {ApplicationOption} from './types/application-option';

export default async (
	{TRANSLATION_FILE_NAME, LANGUAGES_FILE_NAME, USE_DOUBLE_QUOTES, IS_PRODUCTION, LOCALES_DIR}: ApplicationOption,
	onServerStarted: (url: string) => void,
): Promise<void> => {
	const PUBLIC_PATH = path.join(__dirname, '../public');
	const PORT = process.env.PORT || await getPort({port: 9090});

	const TRANSLATIONS_FILE_PATH = path.join(LOCALES_DIR, TRANSLATION_FILE_NAME);
	const LANGUAGES_FILE_PATH = path.join(LOCALES_DIR, LANGUAGES_FILE_NAME);

	const ACTION_OPTIONS: ActionOptions = {TRANSLATIONS_FILE_PATH, LANGUAGES_FILE_PATH, USE_DOUBLE_QUOTES};

	console.log(TRANSLATIONS_FILE_PATH);

	const app = express();
	const server = http.createServer(app);

	const wss = new WebSocket.Server({server});

	app.use(express.static(PUBLIC_PATH));
	app.use(cors());

	app.get('/ping', (req, res) => {
		res.send('pong');
	});

	app.get('*', (req, res) => {
		res.sendFile(path.join(PUBLIC_PATH, 'index.html'));
	});

	wss.on('connection', async (ws) => {
		console.log('client connected');

		ws.on('message', async (dataRaw) => {
			try {
				if (typeof dataRaw === 'string') {
					const data = JSON.parse(dataRaw) as { event: string, payload: any };

					console.log(data);

					try {
						await handleAction(data, ws);
					} catch (e) {
						console.log('An Error occurred whyle handeling action: ', e);
						send(ws, {event: data.event + '_ERROR', payload: e.message});
					}
				}
			} catch (e) {
				console.log('An unknown Error occurred while processing message: ', e, 'with data: ', dataRaw);
				send(ws, {event: 'ERROR', payload: 'An unknown Error occurred while processing message'});
			}
		});
	});

	getFileWatcher(TRANSLATIONS_FILE_PATH).on('change', async () => {
		const translations = await getTranslationsAction({}, ACTION_OPTIONS);
		broadcast(translations);
	});

	server.listen(PORT, () => {
		console.log(`starting server on PORT:${PORT} in PRODUCTION:${IS_PRODUCTION}`);
		onServerStarted(`http://localhost:${PORT}`);
	});

	function broadcast(data: any) {
		const dataString = JSON.stringify(data);
		wss.clients.forEach(function each(client) {
			if (client.readyState === WebSocket.OPEN) {
				client.send(dataString);
			}
		});
	}

	function send(ws: WebSocket, data: any) {
		const dataString = JSON.stringify(data);
		ws.send(dataString);
	}

	async function handleAction({event, payload}: { event: string, payload: any }, ws: WebSocket) {
		let returnMessage;
		switch (event) {
			case 'GET_TRANSLATIONS':
				returnMessage = await getTranslationsAction({}, ACTION_OPTIONS);
				break;
			case 'GET_LANGUAGES':
				returnMessage = await getLanguagesAction({}, ACTION_OPTIONS);
				break;
			case 'CHANGE_TRANSLATION':
				returnMessage = await changeTranslationAction(payload, ACTION_OPTIONS);
				break;
			case 'CHANGE_KEY':
				returnMessage = await changeKeyAction(payload, ACTION_OPTIONS);
				break;
			case 'DELETE_TRANSLATION':
				returnMessage = await deleteTranslationAction(payload, ACTION_OPTIONS);
				break;
			case 'ADD_TRANSLATION':
				returnMessage = await addTranslationAction(payload, ACTION_OPTIONS);
				break;
			default:
				throw new Error(`could not find event ${event}`);
		}

		if (returnMessage !== undefined) {
			send(ws, returnMessage);
		}
	}
};
