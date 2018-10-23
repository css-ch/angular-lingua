export const DELETE_TRANSLATION_EVENT_NAME = 'DELETE_TRANSLATION';

export interface DeleteTranslationEvent {
  event: typeof DELETE_TRANSLATION_EVENT_NAME;
  payload: { key: string };
}
