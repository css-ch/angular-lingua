import {ModuleWithProviders, NgModule} from '@angular/core';
import {LANGUAGE_TOKEN} from './language.token';
import {TranslationService} from './service/translation.service';
import {TranslationPipe} from './pipe/translation.pipe';
import {TranslationComponent} from './component/translation.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateParamsDirective} from './component/translate-params.directive';

@NgModule({
  imports: [CommonModule, BrowserModule],
  declarations: [TranslationPipe, TranslationComponent, TranslateParamsDirective],
  exports: [TranslationPipe, TranslationComponent, TranslateParamsDirective]
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


