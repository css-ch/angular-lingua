import {Component} from '@angular/core';
import {LOCALES} from '../../../locales/locales';

@Component({
  selector: 'app-pipe-example-page',
  templateUrl: './pipe-example-page.component.html',
  styleUrls: ['./pipe-example-page.component.scss']
})
export class PipeExamplePageComponent {
  readonly LOCALES = LOCALES;
}
