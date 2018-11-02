Usage
======

listed below are some basic usages of the i18n Pipe

Basic Example
------
```html
<p>
  {{ LOCALES.TITLE | i18n }}
</p>
```

Example with Parameters
------
```html
<p>
  {{ LOCALES.GREETING_MALE | i18n: {NAME: "Hans Peter"} }}
</p>
```

Example with fixed language
------
```html
<p>
  {{ LOCALES.TITLE | i18n: {} : 'ita' }}
</p>
```

