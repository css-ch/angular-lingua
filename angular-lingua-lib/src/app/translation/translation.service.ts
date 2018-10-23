import {Inject, Injectable} from '@angular/core';
import {LANGUAGE_TOKEN} from './translation.token';
import {LocalesEntry} from '../../locales/locales-entry.type';
import {LOCALES_TOKEN} from './locales/locales.token';
import {LocalesMap} from './locales/locales-map.type';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private language: keyof LocalesEntry;

  public $language: Subject<string> = new Subject();

  constructor(
    @Inject(LANGUAGE_TOKEN) defaultLang,
    @Inject(LOCALES_TOKEN) private locales: LocalesMap) {
    this.language = defaultLang;
  }

  get(entry: LocalesEntry | string, opts?: { [k: string]: string }, lang?: keyof LocalesEntry): string {
    const translationList = this.getTranslationList(entry, lang);

    let str = '';
    for (const translation of translationList) {
      if (translation.type === 'key') {
        if (opts[translation.value] === undefined) {
          throw new Error(`could not replace variable: ${translation.value}`);
        }
        str += opts[translation.value];
      } else {
        str += translation.value;
      }
    }
    return str;
  }

  public getTranslationList(entry: LocalesEntry | string, lang?: keyof LocalesEntry): { type: 'string' | 'key', value: string }[] {
    lang = (lang) ? lang : this.language;
    const result = [];
    let m;
    let str;
    if (typeof entry === 'string') {
      str = this.locales[entry][lang];
    } else {
      str = entry[lang];
    }

    const removeEscapeFunction = (replace) => replace.slice(1);

    while ((m = /(^|[^\\]){{\w+}}/gm.exec(str)) !== null) {
      let optsKey;
      if (m.index === 0) {
        optsKey = m[0].slice(2, -2);
      } else {
        optsKey = m[0].slice(3, -2);
      }


      result.push({type: 'string', value: str.slice(0, m.index + 1).replace(/\\{{\w+}}/gm, removeEscapeFunction)});
      result.push({type: 'key', value: optsKey});

      str = str.slice(m.index + m[0].length);
    }

    result.push({type: 'string', value: str.replace(/\\{{\w+}}/gm, removeEscapeFunction)});

    return result;
  }

  changeLanguage(lang: keyof LocalesEntry) {
    this.language = lang;
    this.$language.next(this.language);
  }
}
