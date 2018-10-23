import fs from 'fs';

import chokidar, {FSWatcher} from 'chokidar';
import {TranslationJson} from './types/translation-json';

const watchers: { [k: string]: FSWatcher } = {};

export async function getTranslations(translationFilePath: string): Promise<TranslationJson> {
	let localesString = await getJsonStringFromFile(translationFilePath);
	const usesSingleQuote = localesString.lastIndexOf('\'') > localesString.lastIndexOf('"');

	if (usesSingleQuote) {
		localesString = localesString.replace(/[^\\]"/g, (e) => `${e.charAt(0)}\\"`);
		localesString = localesString.replace(/[^\\]'/g, (e) => `${e.charAt(0)}"`);
	}

	localesString = localesString.replace(/\\'/g, '\'');

	return JSON.parse(localesString);
}

export async function getLanguages(languageFilePath: string): Promise<string[]> {
	let languagesString = await getJsonStringFromFile(languageFilePath);

	languagesString = languagesString.replace('{', '');
	languagesString = languagesString.replace('}', '');
	languagesString = languagesString.replace(/\n/gm, '');
	languagesString = languagesString.replace(/[ ]/gm, '');

	const languageArray = languagesString.split(':string;');
	languageArray.pop();
	return languageArray;
}

export async function getJsonStringFromFile(path: string): Promise<string> {
	const data = await getFile(path);

	const START_OF_JSON = data.indexOf('{');
	const END_OF_JSON = data.lastIndexOf('}') + 1;

	return data.substring(START_OF_JSON, END_OF_JSON);
}

export async function saveTranslationToFile(
	translations: TranslationJson,
	useDoubleQuotes: boolean,
	path: string,
): Promise<void> {
	const qot = (useDoubleQuotes) ? '"' : '\'';
	let outputString = 'export const LOCALES =  {\n';

	for (const translationKey in translations) {
		if (translations.hasOwnProperty(translationKey)) {
			outputString += `  ${qot}${translationKey}${qot}: {\n`;

			let hasKeys = false;
			for (const langKey in translations[translationKey]) {
				if (translations[translationKey].hasOwnProperty(langKey)) {
					hasKeys = true;
					const translationValue = JSON.stringify(translations[translationKey][langKey])
						.slice(1, -1)
						.replace(/'/gm, `\\'`);
					outputString += `    ${qot}${langKey}${qot}: ${qot}${translationValue}${qot},\n`;
				}
			}

			if (hasKeys) {
				outputString = outputString.slice(0, -2);
				outputString += '\n';
			}

			outputString += '  },\n';
		}
	}

	outputString = outputString.slice(0, -2) + '\n';
	outputString += '};\n';

	await writeFile(path, outputString);
}

export function getFileWatcher(path: string): FSWatcher {
	let watcher;

	if (watchers[path] !== undefined) {
		watcher = watchers[path];
	} else {
		watcher = chokidar.watch(path, {usePolling: true});
		watchers[path] = watcher;
		watcher.on('error', (error) => console.log(`Watcher error: ${error}`));
	}

	return watcher;
}

function getFile(path: string): Promise<string> {
	return new Promise(((resolve, reject) => {
		fs.readFile(path, 'utf8', (err, data) => {
			if (err) {
				console.log(`error reading file: ${err}`);
				reject(err);
				return;
			}

			resolve(data);
		});
	}));
}

function writeFile(path: string, content: string): Promise<void> {
	if (watchers[path] !== undefined) {
		watchers[path].unwatch(path);
	}
	return new Promise((resolve, reject) => {
		fs.writeFile(path, content, 'utf8', (err) => {
			if (err) {
				reject(err);
				return;
			}
			if (watchers[path] !== undefined) {
				watchers[path].add(path);
			}
			resolve();
		});
	});
}
