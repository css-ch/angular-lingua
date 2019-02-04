import {ChangeDetectorRef, OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {Subscription} from 'rxjs';
import {skip} from 'rxjs/operators';
import {isEqual} from '../helper';
import {TranslationService} from '../service/translation.service';
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

  private readonly language$$: Subscription;

  private markForTransform = true;
  private value: string;
  private oldTranslation: Translation;
  private oldOpts: { [k: string]: string } = {};
  private oldLang: string = null;

  constructor(
    private translationService: TranslationService,
    private changeDetectorRef: ChangeDetectorRef) {
    this.language$$ = this.translationService.$language.pipe(skip(1)).subscribe(() => {
      this.markForTransform = true;
      this.changeDetectorRef.detectChanges();
    });
  }

  transform(translation: Translation, opts?: { [k: string]: string }, lang?: string, ...rest: string[]): string {
    if (this.markForTransform || this.oldTranslation !== translation || !isEqual(this.oldOpts, opts) || this.oldLang !== lang) {
      this.value = this.translationService.get(translation, opts, lang);
      this.oldTranslation = translation;
      this.oldLang = lang;
      this.markForTransform = false;
      Object.assign(this.oldOpts, opts);
    }

    return this.value;
  }

  ngOnDestroy(): void {
    if (this.language$$) {
      this.language$$.unsubscribe();
    }
  }
}
