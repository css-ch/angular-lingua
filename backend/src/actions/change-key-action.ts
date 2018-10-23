import {getTranslations, saveTranslationToFile} from '../file';
import {ActionOptions} from '../types/action-options';

export async function changeKeyAction(data: { oldKey: string, newKey: string }, actionOptions: ActionOptions) {
	const translations = await getTranslations(actionOptions.TRANSLATIONS_FILE_PATH);

	if (translations[data.oldKey] === undefined) {
		throw new Error(`could not change key of translation. key: '${data.oldKey}' does not exist.`);
	}

	if (translations[data.newKey] !== undefined) {
		throw new Error(`could not change key of translation. newKey: '${data.newKey}' does already exist.`);
	}

	const translation = translations[data.oldKey];
	delete translations[data.oldKey];
	translations[data.newKey] = translation;

	await saveTranslationToFile(translations, actionOptions.USE_DOUBLE_QUOTES, actionOptions.TRANSLATIONS_FILE_PATH);
}
