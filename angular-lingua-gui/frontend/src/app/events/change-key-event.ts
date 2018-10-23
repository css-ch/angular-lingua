export const CHANGE_KEY_EVENT_NAME = 'CHANGE_KEY';

export interface ChangeKeyEvent {
  event: typeof CHANGE_KEY_EVENT_NAME;
  payload: { oldKey: string, newKey: string };
}
