import {TranslationService} from './translation.service';

describe('TranslationService', () => {
  let service: TranslationService;
  const defaultLang = 'deu';

  beforeEach(() => {
    service = new TranslationService(defaultLang);
  });

  it('#get Should just return the translation', () => {
    const smTranslation = 'Hello World';
    expect(service.get({[defaultLang]: smTranslation})).toBe(smTranslation);
  });

  it('#get Should throw error translation not found', () => {
    expect(() => service.get({})).toThrowError(/.*translation not found.*/);
  });

  it('#get Should replace variables', () => {
    const smTranslation = 'Hello {{NAME1}} and {{NAME2}}';
    expect(service.get({[defaultLang]: smTranslation}, {NAME1: 'Peter', NAME2: 'PAUL'})).toBe('Hello Peter and PAUL');
  });

  it('#get Should throw error variable could not be replaced', () => {
    const smTranslation = 'Hello {{World}}';
    expect(() => service.get({[defaultLang]: smTranslation}, {})).toThrowError('could not replace variable: World');
  });

  it('#get Should use custom lang', () => {
    const smTranslation = 'Hola Mundo';
    expect(service.get({esp: smTranslation}, {}, 'esp')).toBe(smTranslation);
  });

  it('#get Should replace both variables', () => {
    const smTranslation = 'The name is {{FIRST_NAME}} {{LAST_NAME}}';
    expect(service.get({[defaultLang]: smTranslation}, {
      FIRST_NAME: 'James',
      LAST_NAME: 'Bond'
    }, )).toBe('The name is James Bond');
  });

  it('#get Should replace variable at the beginning with single space', () => {
    const smTranslation = ' {{SOME_VAR}}';
    expect(service.get({[defaultLang]: smTranslation}, {
      SOME_VAR: 'Hello',
    }, )).toBe(' Hello');
  });

  it('#get Should escape variable', () => {
    const smTranslation = 'Hello \\{{World}}';
    expect(service.get({[defaultLang]: smTranslation})).toBe('Hello {{World}}');
  });


  it('#get should have no \'{}\' characters', () => {
    const smTranslation = '{{World}} Hello';
    const translated = service.get({[defaultLang]: smTranslation}, {World: 'World'});
    const containsBrackets = translated.indexOf('{') !== -1 || translated.indexOf('}') !== -1;

    expect(containsBrackets).toBeFalsy();
  });

  it('#get external has more prio than internal', () => {
    const internalLang = 'deu', externalLang = 'eng';
    service = new TranslationService(internalLang, externalLang);

    const LOCALES = {
      TITLE: {
        [internalLang]: 'HALLO',
        [externalLang]: 'HELLO'
      }
    };

    expect(service.get(LOCALES.TITLE)).toBe('HELLO');
  });

  it('#changeLanguage should change default language', () => {
    const LOCALES = {
      TITLE: {
        [defaultLang]: 'HELLO',
        spa: 'HOLLA'
      }
    };

    expect(service.get(LOCALES.TITLE)).toBe('HELLO');
    service.changeLanguage('spa');
    expect(service.get(LOCALES.TITLE)).toBe('HOLLA');
  });

  it('#changeLanguage should emit language event', () => {
    const newLang = 'ita';

    const $languageSpy = spyOn(service.$language, 'next');

    service.changeLanguage(newLang);

    expect($languageSpy).toHaveBeenCalled();
  });
});
