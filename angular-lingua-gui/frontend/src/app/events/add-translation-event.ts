import {Translation} from '../types/translation.type';

export const ADD_TRANSLATION_EVENT_NAME = 'ADD_TRANSLATION';

export interface AddTranslationEvent {
  event: typeof ADD_TRANSLATION_EVENT_NAME;
  payload: Translation;
}
