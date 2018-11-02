# AngularLingua

Is a Translation framework for Angular.

## Getting started

First you need to install the library.

```bash
npm i @cssinsurance/angular-lingua
```

then you can register it in your app module.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslationModule } from '@cssinsurance/angular-lingua';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TranslationModule.forRoot('deu')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

you then need to create a file where you want to store your translations.
e. g. src/locales/locales.ts

```typescript
export const LOCALES =  {
  'TITLE': {
    'deu': 'übersetzung framework',
    'ita': 'quadro di traduzione',
    'fra': 'cadre de traduction'
  },
  'GREETINGS': {
    'GREETING_MALE': {
      'deu': 'hallo herr {{NAME}}',
      'ita': 'ciao signor {{NAME}}',
      'fra': 'bonjour monsieur {{NAME}}'
    }
  },
  'FLAG': {
    'deu': 'dies \"{{FLAG}}\" ist eine Flagge',
    'ita': 'questa \"{{FLAG}} è una bandiera',
    'fra': 'c\"est \"{{FLAG}}\" un drapeau'
  }
};
```

It is important that you use this structure.
you can nest your translations.

To use your translations in a component you first have to import it
into object scope.

```typescript
import {Component} from '@angular/core';
import {LOCALES} from '../locales/locales';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly LOCALES = LOCALES;
}
```

you are now able to use your translations in appComponent.   
you can find the usage example of the others in the translation modules section

## GUI
