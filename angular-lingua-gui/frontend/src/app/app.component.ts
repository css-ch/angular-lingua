import {Component, OnInit} from '@angular/core';
import {GET_TRANSLATIONS_EVENT_NAME} from './events';
import {TranslationService} from './services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'translation-gui';

  constructor(private translationService: TranslationService) {
    // this.translationService.translationCount$.subscribe((s) => console.log(s));
    // this.translationService.translations$.subscribe((s) => console.log(s));
    this.translationService.socket$.subscribe((e) => console.log(e));
  }

  ngOnInit(): void {
    // this.translationService.update();

  }
}
