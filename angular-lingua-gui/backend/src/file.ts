import chokidar, {FSWatcher} from 'chokidar';
import fs from 'fs';
import requireFromString from 'require-from-string';
import * as ts from 'typescript';
import {TranslationJson} from './types/translation-json';

const watchers: { [k: string]: FSWatcher } = {};

export async function getTranslations(translationFilePath: string): Promise<TranslationJson> {

	const rawFile = await getFile(translationFilePath);

	const transpileOutput = ts.transpileModule(rawFile, {
		compilerOptions: {module: ts.ModuleKind.CommonJS}
	});

	return requireFromString(transpileOutput.outputText).LOCALES;
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
			if (/\s/.test(translationKey)) {
				// If the key contains white spaces put quotes around it
				outputString += `  ${qot}${translationKey}${qot}: {\n`;
			} else {
				outputString += `  ${translationKey}: {\n`;
			}

			let hasKeys = false;
			const langKeys = Object.keys(translations[translationKey]).sort();
			for (const langKey of langKeys) {
				if (translations[translationKey].hasOwnProperty(langKey)) {
					hasKeys = true;
					const translationValue = JSON.stringify(translations[translationKey][langKey])
						.slice(1, -1)
						.replace(/'/gm, `\\'`);
					outputString += `    ${langKey}: ${qot}${translationValue}${qot},\n`;
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
