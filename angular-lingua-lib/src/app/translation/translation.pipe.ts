import {ChangeDetectorRef, OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {TranslationService} from './translation.service';
import {LocalesEntry} from '../../locales/locales-entry.type';
import {Subscription} from 'rxjs';
import {LOCALES} from '../../locales/locales';

@Pipe({
  name: 'i18n',
  pure: false
})
export class TranslationPipe implements PipeTransform, OnDestroy {
  //
  // There is currently no way to trigger change detection from inside a pure Pipe.
  // https://github.com/angular/angular/issues/15041
  //

  private subscription$$: Subscription;

  constructor(
    private translationService: TranslationService,
    private changeDetectorRef: ChangeDetectorRef) {
    this.subscription$$ = this.translationService.$language.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }

  transform(key: LocalesEntry | string, opts: { [k: string]: string }, lang: keyof LocalesEntry, ...rest: string[]): any {
    if (key === undefined) {
      throw Error('undefined Translation key');
    }

    return this.translationService.get(key, opts, lang);
  }

  ngOnDestroy(): void {
    if (this.subscription$$) {
      this.subscription$$.unsubscribe();
    }
  }
}
