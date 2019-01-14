import { Component, OnInit } from '@angular/core';
import {LOCALES} from '../../../locales/locales';

@Component({
  selector: 'app-directive-example-page',
  templateUrl: './directive-example-page.component.html',
  styleUrls: ['./directive-example-page.component.scss']
})
export class DirectiveExamplePageComponent implements OnInit {
  readonly LOCALES = LOCALES;

  constructor() { }

  ngOnInit() {
  }

}
