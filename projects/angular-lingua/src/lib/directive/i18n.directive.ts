import {Directive, ElementRef, Input, OnChanges, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {TranslationService} from '../service/translation.service';
import {Translation} from '../translation.type';

@Directive({
  selector: '[i18n]'
})
export class I18nDirective implements OnDestroy, OnChanges {

  private readonly language$$: Subscription;

  @Input('i18n') translation: Translation | undefined;
  @Input() i18nParams: { [k: string]: string } = {};
  @Input() i18nLanguage: string | undefined;

  constructor(
    private translationService: TranslationService,
    private element: ElementRef) {
    this.language$$ = this.translationService.$language.subscribe(() => {
      this.update();
    });
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    if (!this.translation) {
      return;
    }
    this.element.nativeElement.textContent = this.translationService.get(this.translation, this.i18nParams, this.i18nLanguage);
  }

  ngOnDestroy(): void {
    if (this.language$$) {
      this.language$$.unsubscribe();
    }
  }
}
