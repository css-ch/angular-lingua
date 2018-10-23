
export const LANGUAGES_EVENT_NAME = 'LANGUAGES';

export interface LanguagesEvent {
  event: typeof LANGUAGES_EVENT_NAME;
  payload: string[];
}
