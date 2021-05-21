import { Component, OnInit } from '@angular/core';
import {LOCALES} from '../../../locales/locales';

@Component({
  selector: 'app-component-example-page',
  templateUrl: './component-example-page.component.html',
  styleUrls: ['./component-example-page.component.scss']
})
export class ComponentExamplePageComponent implements OnInit {
  readonly LOCALES = LOCALES;

  constructor() { }

  ngOnInit() {
  }

}
