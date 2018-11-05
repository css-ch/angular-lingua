import {Component, OnInit} from '@angular/core';
import {LOCALES} from '../../../locales/locales';

@Component({
  selector: 'app-pipe-example-page',
  templateUrl: './pipe-example-page.component.html',
  styleUrls: ['./pipe-example-page.component.scss']
})
export class PipeExamplePageComponent implements OnInit {
  readonly LOCALES = LOCALES;

  constructor() {
  }

  ngOnInit() {
  }

}
