import {Translation} from './types/translation';
import {TranslationJson} from './types/translation-json';

export function translationJsonToArray(translationJson: TranslationJson): Translation[] {
	return Object.keys(translationJson).map((key) => {
		return {key, value: translationJson[key]};
	});
}

export function translationArrayToJson(translationTypes: Translation[]): TranslationJson {
	const translationJson: TranslationJson = {};

	for (const type of translationTypes) {
		translationJson[type.key] = type.value;
	}

	return translationJson;
}
