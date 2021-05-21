import {Inject, Injectable, Optional} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LANGUAGE_TOKEN, LANGUAGE_TOKEN_INTERNAL} from '../language.token';
import {Translation} from '../translation.type';
import {TranslationList} from '../translation-list.type';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  public $language: BehaviorSubject<string>;

  constructor(
    @Inject(LANGUAGE_TOKEN_INTERNAL) languageInternal: string,
    @Optional() @Inject(LANGUAGE_TOKEN) languageExternal?: string
  ) {
    const language = (languageExternal) ? languageExternal : languageInternal;
    this.$language = new BehaviorSubject(language);
  }

  public get language() {
    return this.$language.getValue();
  }

  get(entry: Translation, opts?: { [k: string]: string }, lang?: string): string {
    if (entry === undefined || entry === null) {
      throw Error('undefined Translation key');
    }

    const translationList = this.getTranslationList(entry, lang);

    let str = '';
    for (const translation of translationList) {
      if (translation.type === 'key') {
        if (opts === undefined || opts[translation.value] === undefined) {
          throw new Error(`could not replace variable: ${translation.value}`);
        }
        str += opts[translation.value];
      } else {
        str += translation.value;
      }
    }
    return str;
  }

  public getTranslationList(entry: Translation, lang?: string): TranslationList {
    lang = (lang) ? lang : this.language;
    const result: TranslationList = [];
    let str = entry[lang];

    if (str === undefined) {
      throw new Error(`translation not found. entry: ${JSON.stringify(entry)}, lang: ${lang}`);
    }

    const removeEscapeFunction = (replace: string) => replace.slice(1);

    let match: RegExpExecArray | null;
    while ((match = /(^|[^\\]){{\w+}}/gm.exec(str)) !== null) {
      let optsKey;
      if (match.index === 0 && match[0][0] !== '{') {
        // If the key has a single char(space) in front "a{{Var_Name}}"
        // This is because of how the regex matches the char before the var.
        // It does this to see if there is an escape character.
        result.push({type: 'string', value: match[0][0]});
        optsKey = match[0].slice(3, -2);
      } else if (match.index === 0) {
        // If the key is at the beginning "{{Var_Name}} Hello"
        optsKey = match[0].slice(2, -2);
      } else {
        // If the key has a string in front "Hello my name is {{Var_Name}}"
        optsKey = match[0].slice(3, -2);
      }

      if (match.index !== 0) {
        result.push({type: 'string', value: str.slice(0, match.index + 1).replace(/\\{{\w+}}/gm, removeEscapeFunction)});
      }
      result.push({type: 'key', value: optsKey});

      str = str.slice(match.index + match[0].length);
    }

    result.push({type: 'string', value: str.replace(/\\{{\w+}}/gm, removeEscapeFunction)});

    return result;
  }

  public changeLanguage(newLang: string) {
    this.$language.next(newLang);
  }
}
