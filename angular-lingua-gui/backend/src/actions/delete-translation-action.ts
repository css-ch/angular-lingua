import {getTranslations, saveTranslationToFile} from '../file';
import {ActionOptions} from '../types/action-options';

export async function deleteTranslationAction(data: { key: string }, actionOptions: ActionOptions) {
	const translations = await getTranslations(actionOptions.LOCALES_FILE_PATH);

	if (translations[data.key] === undefined) {
		throw new Error(`could not delete translation with key: ${data.key}. does not exist`);
	}

	delete translations[data.key];

	await saveTranslationToFile(translations, actionOptions.USE_DOUBLE_QUOTES, actionOptions.LOCALES_FILE_PATH);
}
