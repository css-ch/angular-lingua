import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LANGUAGE_TOKEN} from '../language.token';
import {Translation} from '../translation.type';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  public $language: BehaviorSubject<string>;

  constructor(
    @Inject(LANGUAGE_TOKEN) private language) {
    this.$language = new BehaviorSubject(language);
  }

  get(entry: Translation, opts?: { [k: string]: string }, lang?: string): string {
    if (entry === undefined || entry === null) {
      throw Error('undefined Translation key');
    }

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

  public getTranslationList(entry: Translation, lang?: string): { type: 'string' | 'key', value: string }[] {
    lang = (lang) ? lang : this.language;
    const result = [];
    let m;
    let str = entry[lang];

    if (str === undefined) {
      throw new Error(`translation not found. entry: ${JSON.stringify(entry)}, lang: ${lang}`);
    }

    const removeEscapeFunction = (replace) => replace.slice(1);

    while ((m = /(^|[^\\]){{\w+}}/gm.exec(str)) !== null) {
      let optsKey;
      if (m.index === 0) {
        optsKey = m[0].slice(2, -2);
      } else {
        optsKey = m[0].slice(3, -2);
      }

      if (m.index !== 0) {
        result.push({type: 'string', value: str.slice(0, m.index + 1).replace(/\\{{\w+}}/gm, removeEscapeFunction)});
      }
      result.push({type: 'key', value: optsKey});

      str = str.slice(m.index + m[0].length);
    }

    result.push({type: 'string', value: str.replace(/\\{{\w+}}/gm, removeEscapeFunction)});
    return result;
  }

  public changeLanguage(newLang: string) {
    this.language = newLang;
    this.$language.next(newLang);
  }
}
