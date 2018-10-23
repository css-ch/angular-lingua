import {Translation} from '../types/translation.type';

export const TRANSLATIONS_EVENT_NAME = 'TRANSLATIONS';

export interface TranslationsEvent {
  event: typeof TRANSLATIONS_EVENT_NAME;
  payload: Translation[];
}
