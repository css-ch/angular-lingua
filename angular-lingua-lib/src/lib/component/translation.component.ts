import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  QueryList,
  TemplateRef
} from '@angular/core';
import {TranslationService} from '../service/translation.service';
import {Translation} from '../translation.type';
import {TranslateParamsDirective} from './translate-params.directive';

@Component({
  selector: 'translate',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent implements OnChanges, AfterContentInit {

  @ContentChildren(TranslateParamsDirective) optChildrenQueryList: QueryList<TranslateParamsDirective> = null;

  @Input() key: Translation;

  @Input() lang: string;

  public optionMap: { [k: string]: TemplateRef<any> };

  public translationList: { type: 'string' | 'key', value: string }[];

  constructor(
    private translationService: TranslationService) {
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
    this.translationList = this.translationService.getTranslationList(this.key, this.lang);
    this.optionMap = {};
    this.optChildrenQueryList.forEach((optChild) => {
      this.optionMap[optChild.optKey] = optChild.templateRef;
    });

    for (const translation of this.translationList) {
      if (translation.type === 'key') {
        if (this.optionMap[translation.value] === undefined) {
          throw Error(`could not find Key: ${translation.value}`);
        }
      }
    }
  }
}
