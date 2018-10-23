import {Translation} from '../types/translation.type';

export const CHANGE_TRANSLATION_EVENT_NAME = 'CHANGE_TRANSLATION';

export interface ChangeTranslationEvent {
  event: typeof CHANGE_TRANSLATION_EVENT_NAME;
  payload: Translation;
}
