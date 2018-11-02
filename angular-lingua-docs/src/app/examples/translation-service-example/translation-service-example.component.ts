import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {LOCALES} from '../../../locales/locales';
import {TranslationService} from '@cssinsurance/angular-lingua';
import {HighlightService} from '../../highlight.service';

@Component({
  selector: 'app-translation-service-example',
  templateUrl: './translation-service-example.component.html',
  styleUrls: ['./translation-service-example.component.scss']
})
export class TranslationServiceExampleComponent implements OnInit, AfterViewChecked {
  readonly LOCALES = LOCALES;

  code1 = `
constructor(private translationService: TranslationService) {
}
  `;

  code2 = `
this.translationService.get(LOCALES.TITLE);
  `;

  code3 = `
this.translationService.get(LOCALES.GREETING_MALE, {NAME: 'PAUL'});
  `;

  code4 = `
this.translationService.get(LOCALES.TITLE, {}, 'ita');
  `;

  code5 = `
this.translationService.changeLanguage('ita');
  `;

  constructor(private highlightService: HighlightService, private translationService: TranslationService) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    this.highlightService.highlightAll();
  }
}
