import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslationsEditorComponent} from './pages/translations-editor/translations-editor.component';
import {TranslationService} from './services/translation.service';
import {
  MatButtonModule, MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslationEditFormComponent} from './components/translation-edit-form/translation-edit-form.component';
import {TranslationNewFormComponent} from './components/translation-new-form/translation-new-form.component';
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
    ReactiveFormsModule
  ],
  providers: [TranslationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
