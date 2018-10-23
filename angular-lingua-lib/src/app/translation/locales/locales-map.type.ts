import {LocalesEntry} from '../../../locales/locales-entry.type';
import {LOCALES} from '../../../locales/locales';

export type LocalesMap = {
  [P in keyof typeof LOCALES]: LocalesEntry;
};
