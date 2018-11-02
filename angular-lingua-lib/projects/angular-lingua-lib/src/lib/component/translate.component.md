Usage
======

unlike the directive or the pipe, with this
component you can replace variables in your translation
with components.

listed below are some basic usages of the translate component

Basic Example
------
```html
<translate [key]="LOCALES.TITLE">
</translate>
```

Example with Parameters
------
```html
<translate [key]="LOCALES.FLAG">
  <mat-icon *appOptKey="'FLAG'">flag</mat-icon>
</translate>
```


Example with fixed language
------
```html
<translate [key]="LOCALES.FLAG">
  <ng-template appOptKey="FLAG">
    <mat-icon>flag</mat-icon>
  </ng-template>
</translate>
```

