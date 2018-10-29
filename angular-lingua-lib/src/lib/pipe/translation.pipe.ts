import {ChangeDetectorRef, OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {TranslationService} from '../service/translation.service';
import {Subscription} from 'rxjs';
import {Translation} from '../translation.type';

@Pipe({
  name: 'i18n',
  pure: false
})
export class TranslationPipe implements PipeTransform, OnDestroy {
  //
  // There is currently no way to trigger change detection from inside a pure Pipe.
  // https://github.com/angular/angular/issues/15041
  //

  private readonly subscription$$: Subscription;

  constructor(
    private translationService: TranslationService,
    private changeDetectorRef: ChangeDetectorRef) {
    this.subscription$$ = this.translationService.$language.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }

  transform(key: Translation, opts: { [k: string]: string }, lang: string, ...rest: string[]): any {
    return this.translationService.get(key, opts, lang);
  }

  ngOnDestroy(): void {
    if (this.subscription$$) {
      this.subscription$$.unsubscribe();
    }
  }
}
