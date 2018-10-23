import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  QueryList,
  TemplateRef
} from '@angular/core';
import {TranslationService} from '../translation.service';
import {LocalesEntry} from '../../../locales/locales-entry.type';
import {OptKeyDirective} from '../opt-key.directive';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent implements OnChanges, AfterContentInit, OnInit, OnDestroy {

  @ContentChildren(OptKeyDirective) optChildrenQueryList: QueryList<OptKeyDirective> = null;

  @Input('key') key: LocalesEntry | string;

  @Input() lang: keyof LocalesEntry;

  public optionMap: { [k: string]: TemplateRef<any> };

  public translationList: { type: 'string' | 'key', value: string }[];

  private subscription$$: Subscription;

  constructor(
    private translationService: TranslationService) {
  }

  ngOnInit() {
    this.subscription$$ = this.translationService.$language.subscribe(() => {
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

  ngOnDestroy(): void {
    if (this.subscription$$) {
      this.subscription$$.unsubscribe();
    }
  }
}
