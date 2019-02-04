import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateParamsDirective} from './component/translate-params.directive';
import {TranslateComponent} from './component/translate.component';
import {I18nDirective} from './directive/i18n.directive';
import {TranslationPipe} from './pipe/translation.pipe';
import {TranslationService} from './service/translation.service';

@NgModule({
  imports: [CommonModule, BrowserModule],
  declarations: [TranslationPipe, TranslateComponent, TranslateParamsDirective, I18nDirective],
  exports: [TranslationPipe, TranslateComponent, TranslateParamsDirective, I18nDirective]
})
export class TranslationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TranslationModule,
      providers: [
        TranslationService,
      ]
    };
  }
}


