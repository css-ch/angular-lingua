import {Component} from '@angular/core';
import {TranslationService} from '@cssinsurance/angular-lingua';
import {LOCALES} from '../locales/locales';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly LOCALES = LOCALES;

  readonly links = [
    {href: 'home', text: 'Home'},
    {href: 'pipe-example', text: 'I18n pipe'},
    {href: 'directive-example', text: 'I18n directive'},
    {href: 'service-example', text: 'Translation service'},
    {href: 'component-example', text: 'Translate component'},
  ];

  readonly languages = [
    {short: 'deu', text: 'German'},
    {short: 'ita', text: 'Italian'},
    {short: 'fra', text: 'French'},
  ];

  constructor(public translationService: TranslationService) {
  }

  changeLanguage(langShort: string) {
    this.translationService.changeLanguage(langShort);
  }

}
