import {ActionOptions} from '../types/action-options';

export async function getLanguagesAction(data: {}, actionOptions: ActionOptions) {
	return {event: 'LANGUAGES', payload: actionOptions.LANGUAGES};
}