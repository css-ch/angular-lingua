import {ScrollingModule as ExperimentalScrollingModule} from '@angular/cdk-experimental/scrolling';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {TranslationEditFormComponent} from './components/translation-edit-form/translation-edit-form.component';
import {TranslationNewFormComponent} from './components/translation-new-form/translation-new-form.component';
import {TranslationsEditorComponent} from './pages/translations-editor/translations-editor.component';
import {TranslationService} from './services/translation.service';
import {KeyTakenValidatorDirective} from './validators/key-taken-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    TranslationsEditorComponent,
    TranslationEditFormComponent,
    TranslationNewFormComponent,
    KeyTakenValidatorDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    ScrollingModule,
    ExperimentalScrollingModule
  ],
  providers: [TranslationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
