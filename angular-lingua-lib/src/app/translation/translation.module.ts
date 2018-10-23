import {ModuleWithProviders, NgModule} from '@angular/core';
import {TranslationService} from './translation.service';
import {TranslationPipe} from './translation.pipe';
import {LANGUAGE_TOKEN} from './translation.token';
import {LOCALES_TOKEN} from './locales/locales.token';
import {LOCALES} from '../../locales/locales';
import {TranslationComponent} from './translation/translation.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {OptKeyDirective} from './opt-key.directive';
import {LocalesEntry} from '../../locales/locales-entry.type';

@NgModule({
  imports: [CommonModule, BrowserModule],
  declarations: [TranslationPipe, TranslationComponent, OptKeyDirective],
  exports: [TranslationPipe, TranslationComponent, OptKeyDirective]
})
export class TranslationModule {
  static forRoot(defaultLang:  keyof LocalesEntry): ModuleWithProviders {
    return {
      ngModule: TranslationModule,
      providers: [
        TranslationService,
        {
          provide: LANGUAGE_TOKEN,
          useValue: defaultLang
        },
        {
          provide: LOCALES_TOKEN,
          useValue: LOCALES
        }
      ]
    };
  }
}


