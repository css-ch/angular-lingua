import {ADD_TRANSLATION_EVENT_NAME, AddTranslationEvent} from './add-translation-event';
import {CHANGE_KEY_EVENT_NAME, ChangeKeyEvent} from './change-key-event';
import {CHANGE_TRANSLATION_EVENT_NAME, ChangeTranslationEvent} from './change-translation-event';
import {DELETE_TRANSLATION_EVENT_NAME, DeleteTranslationEvent} from './delete-translation-event';
import {GET_LANGUAGES_EVENT_NAME, GetLanguagesEvent} from './get-languages-event';
import {GET_TRANSLATIONS_EVENT_NAME, GetTranslationsEvent} from './get-translations-event';
import {LANGUAGES_EVENT_NAME, LanguagesEvent} from './languages-event';
import {TRANSLATIONS_EVENT_NAME, TranslationsEvent} from './translations-event';

export * from './get-translations-event';
export * from './languages-event';
export * from './translations-event';
export * from './change-key-event';
export * from './get-languages-event';
export * from './change-translation-event';
export * from './delete-translation-event';
export * from './add-translation-event';

export type SocketEvent =
  LanguagesEvent |
  TranslationsEvent |
  GetTranslationsEvent |
  ChangeKeyEvent |
  GetLanguagesEvent |
  ChangeTranslationEvent |
  DeleteTranslationEvent |
  AddTranslationEvent;

export type EventName =
  typeof GET_TRANSLATIONS_EVENT_NAME |
  typeof LANGUAGES_EVENT_NAME |
  typeof TRANSLATIONS_EVENT_NAME |
  typeof CHANGE_KEY_EVENT_NAME |
  typeof GET_LANGUAGES_EVENT_NAME |
  typeof CHANGE_TRANSLATION_EVENT_NAME |
  typeof DELETE_TRANSLATION_EVENT_NAME |
  typeof ADD_TRANSLATION_EVENT_NAME;
