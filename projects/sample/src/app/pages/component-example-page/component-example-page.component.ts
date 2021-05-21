import { Component } from '@angular/core';
import {LOCALES} from '../../../locales/locales';

@Component({
  selector: 'app-component-example-page',
  templateUrl: './component-example-page.component.html',
  styleUrls: ['./component-example-page.component.scss']
})
export class ComponentExamplePageComponent {
  readonly LOCALES = LOCALES;
}
