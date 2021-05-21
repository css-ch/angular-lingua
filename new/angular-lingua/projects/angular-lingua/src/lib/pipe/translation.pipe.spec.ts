import {ChangeDetectorRef} from '@angular/core';
import {TranslationService} from '../service/translation.service';
import {TranslationPipe} from './translation.pipe';

describe('TranslationPipe', () => {
  let translationPipe: TranslationPipe;
  let changeDetectorRef: ChangeDetectorRef;
  let translationService: TranslationService;
  const defaultLang = 'deu';

  beforeEach(() => {
    changeDetectorRef = {
      detectChanges(): void {
      },
      markForCheck(): void {
      },
      checkNoChanges(): void {
      },
      detach(): void {
      },
      reattach(): void {
      }
    };
    translationService = new TranslationService(defaultLang);
    translationPipe = new TranslationPipe(translationService, changeDetectorRef);
  });

  it('#transform Should just return the translation', () => {
    const smTranslation = 'Hello World';
    expect(translationPipe.transform({[defaultLang]: smTranslation})).toBe(smTranslation);
  });

  it('#get Should throw error translation not found', () => {
    expect(_ => translationPipe.transform({})).toThrowError(/.*translation not found.*/);
  });

  it('#get Should replace variables', () => {
    const smTranslation = 'Hello {{NAME1}} and {{NAME2}}';
    expect(translationPipe.transform({[defaultLang]: smTranslation}, {NAME1: 'Peter', NAME2: 'Paul'})).toBe('Hello Peter and Paul');
  });

  it('#get Should throw error variable could not be replaced', () => {
    const smTranslation = 'Hello {{World}}';
    expect(_ => translationPipe.transform({[defaultLang]: smTranslation}, {})).toThrowError('could not replace variable: World');
  });

  it('#get Should use custom lang', () => {
    const smTranslation = 'Hola Mundo';
    expect(translationPipe.transform({esp: smTranslation}, {}, 'esp')).toBe(smTranslation);
  });

  it('#get Update when custom lang changes', () => {
    const smTranslationEsp = 'Hola Mundo';
    const smTranslationDeu = 'Hello World';
    const vars = {};
    const translation = {esp: smTranslationEsp, deu: smTranslationDeu};

    expect(translationPipe.transform(translation, vars, 'esp')).toBe(smTranslationEsp);
    expect(translationPipe.transform(translation, vars, 'deu')).toBe(smTranslationDeu);
  });

  it('#get Should return new translation when input changes', () => {
    const smTranslation = 'Hello {{NAME}}';
    const vars = {NAME: 'Peter'};
    const translation = {[defaultLang]: smTranslation};

    expect(translationPipe.transform(translation, vars)).toBe('Hello Peter');

    vars.NAME = 'Paul';
    expect(translationPipe.transform(translation, vars)).toBe('Hello Paul');
  });
});
