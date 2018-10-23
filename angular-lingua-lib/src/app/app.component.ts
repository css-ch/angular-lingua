import {Component, Inject} from '@angular/core';
import {TranslationService} from './translation/translation.service';
import {LOCALES_TOKEN} from './translation/locales/locales.token';
import {LocalesMap} from './translation/locales/locales-map.type';
import {LocalesEntry} from '../locales/locales-entry.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private translationService: TranslationService, @Inject(LOCALES_TOKEN) public locales: LocalesMap) {
    console.log(this.translationService.get(locales.TITLE));
    console.log(this.translationService.get('TITLE'));
    console.log(this.translationService.get(locales.GREETING_MALE, {NAME: 'Donato Wolfisberg'}));
  }

  changeLanguage(lang: keyof LocalesEntry) {
    this.translationService.changeLanguage(lang);
  }
}
