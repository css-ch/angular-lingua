import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnChanges, OnDestroy,
  QueryList,
  TemplateRef
} from '@angular/core';
import {TranslationService} from '../service/translation.service';
import {Translation} from '../translation.type';
import {TranslateParamsDirective} from './translate-params.directive';
import {Subscription} from 'rxjs';

@Component({
  selector: 'translate',
  templateUrl: './translate.component.html',
  styles: []
})

export class TranslateComponent implements OnChanges, AfterContentInit, OnDestroy {

  @ContentChildren(TranslateParamsDirective) optChildrenQueryList: QueryList<TranslateParamsDirective> = null;

  @Input() key: Translation = null;

  @Input() lang: string;

  public optionMap: { [k: string]: TemplateRef<any> };

  public translationList: { type: 'string' | 'key', value: string }[];

  public language$$: Subscription;

  constructor(
    private translationService: TranslationService) {
    this.language$$ = this.translationService.$language.subscribe(() => {
      this.updateTranslations();
    });
  }

  ngOnChanges() {
    if (this.optChildrenQueryList !== null) {
      this.updateTranslations();
    }
  }

  ngAfterContentInit() {
    this.updateTranslations();
  }

  updateTranslations() {
    if (this.key === null) {
      return;
    }
    this.translationList = this.translationService.getTranslationList(this.key, this.lang);
    this.optionMap = {};
    this.optChildrenQueryList.forEach((optChild) => {
      this.optionMap[optChild.translateParams] = optChild.templateRef;
    });

    for (const translation of this.translationList) {
      if (translation.type === 'key') {
        if (this.optionMap[translation.value] === undefined) {
          throw Error(`could not find Key: ${translation.value}`);
        }
      }
    }
  }

  ngOnDestroy(): void {
    if (this.language$$) {
      this.language$$.unsubscribe();
    }
  }


}
