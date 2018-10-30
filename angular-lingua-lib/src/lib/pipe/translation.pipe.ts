import {Pipe, PipeTransform} from '@angular/core';
import {TranslationService} from '../service/translation.service';
import {Translation} from '../translation.type';

@Pipe({
  name: 'i18n',
  pure: true
})
export class TranslationPipe implements PipeTransform {
  //
  // There is currently no way to trigger change detection from inside a pure Pipe.
  // https://github.com/angular/angular/issues/15041
  //

  constructor(
    private translationService: TranslationService) {
  }

  transform(key: Translation, opts: { [k: string]: string }, lang: string, ...rest: string[]): any {
    return this.translationService.get(key, opts, lang);
  }
}
