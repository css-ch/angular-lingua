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
