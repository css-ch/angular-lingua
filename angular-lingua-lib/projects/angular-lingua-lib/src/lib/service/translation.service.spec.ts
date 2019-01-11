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
    expect(_ => service.get({})).toThrowError(/.*translation not found.*/);
  });

  it('#get Should replace variables', () => {
    const smTranslation = 'Hello {{NAME1}} and {{NAME2}}';
    expect(service.get({[defaultLang]: smTranslation}, {NAME1: 'Peter', NAME2: 'PAUL'})).toBe('Hello Peter and PAUL');
  });

  it('#get Should throw error variable could not be replaced', () => {
    const smTranslation = 'Hello {{World}}';
    expect(_ => service.get({[defaultLang]: smTranslation}, {})).toThrowError('could not replace variable: World');
  });

  it('#get Should use custom lang', () => {
    const smTranslation = 'Hola Mundo';
    expect(service.get({esp: smTranslation}, {}, 'esp')).toBe(smTranslation);
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
});
