import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {TranslationService} from '@cssinsurance/angular-lingua';
import {LOCALES} from '../../../locales/locales';
import {HighlightService} from '../../highlight.service';

@Component({
  selector: 'app-translation-directive-example',
  templateUrl: './translation-directive-example.component.html',
  styleUrls: ['./translation-directive-example.component.scss']
})
export class TranslationDirectiveExampleComponent implements AfterViewChecked {
  readonly LOCALES = LOCALES;

  code1 = `
<p [i18n]="LOCALES.TITLE"></p>

  `;

  code2 = `
<p [i18n]="LOCALES.GREETING_MALE" [i18nParams]="{NAME: 'Hans Peter'}"></p>
  `;

  code3 = `
<p [i18n]="LOCALES.TITLE" i18nLanguage="ita"></p>
  `;

  constructor(private highlightService: HighlightService, private translationService: TranslationService) {
  }

  ngAfterViewChecked(): void {
    this.highlightService.highlightAll();
  }

  changeLang(lang: string) {
    this.translationService.changeLanguage(lang);
  }

}
