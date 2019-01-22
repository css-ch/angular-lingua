## AngularLingua-GUI

This is a simple GUI for your [angular-lingua](https://www.npmjs.com/package/angular-lingua) translations.

It can be installed over npm.

```bash
npm i --save-dev angular-lingua-gui
```

then you can create a run script in your package.json. the first parameter is where your location file is stored. After that, you can specify the language keys.

```json
{
  "scripts": {
    "angular-lingua-gui": "angular-lingua-gui src/locales/locales.ts deu ita fra"
  }
}
```

![Screenshot Angular Lingua GUI 1](../documents/screenshot-angular-lingua-gui-1.png "Screenshot Angular Lingua GUI 1")
![Screenshot Angular Lingua GUI 2](../documents/screenshot-angular-lingua-gui-2.png "Screenshot Angular Lingua GUI 2")
