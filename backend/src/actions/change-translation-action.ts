import {getTranslations, saveTranslationToFile} from '../file';
import {ActionOptions} from '../types/action-options';
import {Translation} from '../types/translation';

export async function changeTranslationAction(data: Translation, actionOptions: ActionOptions) {
	const translations = await getTranslations(actionOptions.TRANSLATIONS_FILE_PATH);

	if (translations[data.key] === undefined) {
		throw new Error(`could not change translation with key: ${data.key}. it does not exist.`);
	}

	translations[data.key] = data.value;

	await saveTranslationToFile(translations, actionOptions.USE_DOUBLE_QUOTES, actionOptions.TRANSLATIONS_FILE_PATH);
}