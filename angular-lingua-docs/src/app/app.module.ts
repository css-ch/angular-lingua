import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TranslationPipeExampleComponent } from './examples/translation-pipe-example/translation-pipe-example.component';
import { TranslationDirectiveExampleComponent } from './examples/translation-directive-example/translation-directive-example.component';
import { TranslationServiceExampleComponent } from './examples/translation-service-example/translation-service-example.component';

@NgModule({
  declarations: [
    AppComponent,
    TranslationPipeExampleComponent,
    TranslationDirectiveExampleComponent,
    TranslationServiceExampleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
