import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {LOCALES} from '../../../locales/locales';
import {HighlightService} from '../../highlight.service';
import {TranslationService} from '@cssinsurance/angular-lingua';

@Component({
  selector: 'app-translation-pipe-example',
  templateUrl: './translation-pipe-example.component.html',
  styleUrls: ['./translation-pipe-example.component.scss']
})
export class TranslationPipeExampleComponent implements OnInit, AfterViewChecked {
  readonly LOCALES = LOCALES;

  code1 = `
<p>
  {{ LOCALES.TITLE | i18n }}
</p>
  `;

  code2 = `
<p>
  {{ LOCALES.GREETING_MALE | i18n: {NAME: "Hans Peter"} }}
</p>
  `;

  code3 = `
<p>
  {{ LOCALES.TITLE | i18n: {}:'ita' }}
</p>
  `;

  constructor(private highlightService: HighlightService, private translationService: TranslationService) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    this.highlightService.highlightAll();
  }

  changeLang(lang: string) {
    this.translationService.changeLanguage(lang);
  }
}
