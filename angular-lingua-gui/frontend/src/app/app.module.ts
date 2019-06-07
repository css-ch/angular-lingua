import {ScrollingModule as ExperimentalScrollingModule} from '@angular/cdk-experimental/scrolling';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
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
