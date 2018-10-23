# Translation Framework

## Structure
All Translations are in a typescript file with the structure:

```typescript
export const LOCALES = {
  TRANSLATION_KEY: {
    'deu': 'Translation to German',
    'ita': 'Translation to Italian',
    'fra': 'Translation to French'
  },
  GREETING_MALE: {
    'deu': 'hallo herr {{NAME}}',
    'ita': 'ciao signor {{NAME}}',
    'fra': 'bonjour monsieur {{NAME}}'
  },
};
```

## Usage
You can Always use the key as String or the locales Object.
But the locales Object has the advantage that you have type completion. 

This means you should just use the String method if for example you
become the key through an API request.

### Use in Code
the locals variable is Injected trough the "@Inject(LOCALES_TOKEN)" token.

app.component.ts:13-15
```typescript
console.log(this.translationService.get(locales.TITLE));
console.log(this.translationService.get('TITLE'));
console.log(this.translationService.get(locales.GREETING_MALE, {NAME: 'Donato Wolfisberg'}));
```

### Use in Template

It can be used either with the "i18n" pipe for simple Translations
or through the "app-translation" component for more complex Translations.

app.component.html
```html
<h1>
  {{locales.TITLE | i18n }}
</h1>
<h1>
  {{'TITLE' | i18n }}
</h1>

<p>
  {{locales.GREETING_MALE | i18n: {NAME: 'Donato Wolfisberg'} }}
</p>

<br>

<app-translation [key]="locales.FLAG">
  <ng-template appOptKey="FLAG">
    <mat-icon>flag</mat-icon>
  </ng-template>
</app-translation>

<br>

<app-translation [key]="locales.FLAG">
  <mat-icon *appOptKey="'FLAG'">flag</mat-icon>
</app-translation>
```
