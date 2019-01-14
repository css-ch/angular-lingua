import {ModuleWithProviders, NgModule} from '@angular/core';
import {LANGUAGE_TOKEN} from './language.token';
import {TranslationService} from './service/translation.service';
import {TranslationPipe} from './pipe/translation.pipe';
import {TranslateComponent} from './component/translate.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateParamsDirective} from './component/translate-params.directive';
import {I18nDirective} from './directive/i18n.directive';

@NgModule({
  imports: [CommonModule, BrowserModule],
  declarations: [TranslationPipe, TranslateComponent, TranslateParamsDirective, I18nDirective],
  exports: [TranslationPipe, TranslateComponent, TranslateParamsDirective, I18nDirective]
})
export class TranslationModule {
  static forRoot(defaultLang: string): ModuleWithProviders {
    return {
      ngModule: TranslationModule,
      providers: [
        TranslationService,
        {
          provide: LANGUAGE_TOKEN,
          useValue: defaultLang
        }
      ]
    };
  }
}


