import {Component} from '@angular/core';
import {TranslationService} from 'angular-lingua';
import {LOCALES} from '../../../locales/locales';

@Component({
  selector: 'app-service-example-page',
  templateUrl: './service-example-page.component.html',
  styleUrls: ['./service-example-page.component.scss']
})
export class ServiceExamplePageComponent {
  readonly LOCALES = LOCALES;

  constructor(private translationService: TranslationService) {
  }

  basicExample() {
    const result = this.translationService.get(LOCALES.TITLE);
    console.log(result);
  }

  exampleWithParameters() {
    const result = this.translationService.get(LOCALES.GREETING_MALE, {NAME: 'Hans Peter'});
    console.log(result);
  }

  examplesWithFixedLanguage() {
    const result = this.translationService.get(LOCALES.TITLE, {}, 'ita');
    console.log(result);
  }

}
