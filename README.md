# AngularLingua

AngularLingua is an easy to use Translation Library with Typescript autocompletion and Compile-time safety that your Translation exists.

## Important
If you want the Compile-time safety to work you have to build it with aot enabled.

## Getting started

First, you need to install the library.

```bash
npm i @cssinsurance/angular-lingua
```

then you can register it in your app module. The language you set in the forRoot method will be the Default language. it can later be changed at runtime.

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

in other components, you can just include it without the forRoot method.

```typescript
...
import { TranslationModule } from '@cssinsurance/angular-lingua';

@NgModule({
  ...
  imports: [
    TranslationModule
  ],
  ...
})
export class SomeModule { }
```

you then need to create a file where you want to store your translations.
e. g. src/locales/locales.ts

You can have variables in your Translations with two curly braces like "{{NAME}}". to escape a variable you can do it like this "\\\\{{NAME}}".

```typescript
export const LOCALES =  {
  'TITLE': {
    'deu': 'übersetzung framework',
    'ita': 'quadro di traduzione',
    'fra': 'cadre de traduction'
  },
  'GREETING_MALE': {
    'deu': 'hallo herr {{NAME}}',
    'ita': 'ciao signor {{NAME}}',
    'fra': 'bonjour monsieur {{NAME}}'
  },
  'FLAG': {
    'deu': 'dies \"{{FLAG}}\" ist eine Flagge',
    'ita': 'questa \"{{FLAG}} è una bandiera',
    'fra': 'c\"est \"{{FLAG}}\" un drapeau'
  }
};
```

It is important that you use this structure. When you want the Translation GUI to work properly.

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
You can find the different methods of doing a translation in the specific wiki pages.

## GUI

you can install the GUI with

```bash
npm i --save-dev @cssinsurance/angular-lingua-gui
```

then you can create a run script in your package.json. the first parameter is where your location file is stored. After that, you can specify the language keys.

```json
{
  "scripts": {
    "@cssinsurance/angular-lingua-gui": "angular-lingua-gui src/locales/locales.ts deu ita fra"
  }
}
```
