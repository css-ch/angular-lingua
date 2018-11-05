import {getTranslations} from '../file';
import {translationJsonToArray} from '../translation-mapper';
import {ActionOptions} from '../types/action-options';

export async function getTranslationsAction(data: {}, actionOptions: ActionOptions) {
	const translationJson = await getTranslations(actionOptions.LOCALES_FILE_PATH);
	const translations = translationJsonToArray(translationJson);
	return {event: 'TRANSLATIONS', payload: translations};
}
