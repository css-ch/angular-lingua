import {getLanguages} from '../file';
import {ActionOptions} from '../types/action-options';

export async function getLanguagesAction(data: {}, actionOptions: ActionOptions) {
	const languages = await getLanguages(actionOptions.LANGUAGES_FILE_PATH);
	return {event: 'LANGUAGES', payload: languages};
}