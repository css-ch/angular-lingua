import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {TranslationModule} from '../../projects/angular-lingua-lib/src/public_api';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslationModule.forRoot('deu')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
