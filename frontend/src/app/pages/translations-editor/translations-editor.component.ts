import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Fuse from 'fuse.js';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  ADD_TRANSLATION_EVENT_NAME,
  CHANGE_KEY_EVENT_NAME,
  CHANGE_TRANSLATION_EVENT_NAME,
  DELETE_TRANSLATION_EVENT_NAME,
  GET_LANGUAGES_EVENT_NAME,
  GET_TRANSLATIONS_EVENT_NAME
} from '../../events';
import {TranslationService} from '../../services/translation.service';
import {Translation} from '../../types/translation.type';

@Component({
  selector: 'app-translations-editor',
  templateUrl: './translations-editor.component.html',
  styleUrls: ['./translations-editor.component.css']
})
export class TranslationsEditorComponent implements OnInit, OnDestroy {

  filter$ = new BehaviorSubject<string>('');
  translations$ = new BehaviorSubject<Translation[]>([]);
  languages$ = new BehaviorSubject<string[]>([]);
  filteredTranslations$: Observable<Translation[]>;

  createNewMode = false;

  constructor(public translationService: TranslationService) {
    this.translationService.translationEvent$.pipe(
      map((event) => event.payload)
    ).subscribe(this.translations$);

    this.translationService.languageEvent$.pipe(
      map((languageEvent) => languageEvent.payload)
    ).subscribe(this.languages$);

    this.filteredTranslations$ = combineLatest(this.translations$, this.filter$, this.languages$).pipe(
      map(([translations, filter, languages]) => {
        if (filter === '') {
          return translations;
        }

        const options = {
          shouldSort: true,
          threshold: 0.5,
          location: 0,
          distance: 100,
          maxPatternLength: 64,
          minMatchCharLength: 1,
          keys: [
            'key',
            ...languages.map(lang => `value.${lang}`)
          ]
        };
        const fuse = new Fuse(translations, options);

        return fuse.search(filter);
      })
    );
  }


  ngOnInit() {
    this.translationService.send({
      event: GET_TRANSLATIONS_EVENT_NAME
    });
    this.translationService.send({
      event: GET_LANGUAGES_EVENT_NAME,
    });
  }

  onTranslationKeyChange(oldKey: string, newKey: string) {
    this.translationService.send({
      event: CHANGE_KEY_EVENT_NAME,
      payload: {
        oldKey,
        newKey
      }
    });
  }

  onTranslationChange(translation) {
    this.translationService.send({
      event: CHANGE_TRANSLATION_EVENT_NAME,
      payload: translation
    });
  }

  ngOnDestroy(): void {
  }

  onTranslationDelete(translation: Translation) {
    const translations = this.translations$.value;
    translations.splice(translations.indexOf(translation), 1);
    this.translations$.next(translations);

    this.translationService.send({
      event: DELETE_TRANSLATION_EVENT_NAME,
      payload: {
        key: translation.key
      }
    });
  }

  onCreate(translation: Translation) {
    this.createNewMode = false;

    this.translationService.send({
      event: ADD_TRANSLATION_EVENT_NAME,
      payload: translation
    });

    const translations = this.translations$.value;
    translations.push(translation);

    this.translations$.next(translations);
  }
}
