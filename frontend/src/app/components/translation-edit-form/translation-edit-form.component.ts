import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {Translation} from '../../types/translation.type';

@Component({
  selector: 'app-translation-edit-form',
  templateUrl: './translation-edit-form.component.html',
  styleUrls: ['./translation-edit-form.component.css']
})
export class TranslationEditFormComponent implements OnInit, OnDestroy {

  @Input() translation: Translation;
  @Input() languages: string[];

  @Output() translationKeyChange = new EventEmitter<{ oldKey: string, newKey: string }>();
  @Output() translationChange = new EventEmitter<Translation>();
  @Output() translationDelete = new EventEmitter<Translation>();

  translationKeyChangeDebounce$ = new Subject<{ oldKey: string, newKey: string }>();
  translationChangeDebounce$ = new Subject<Translation>();

  constructor() {
    this.translationKeyChangeDebounce$.pipe(
      debounceTime(100)
    ).subscribe((val) => this.translationKeyChange.emit(val));

    this.translationChangeDebounce$.pipe(
      debounceTime(100)
    ).subscribe((val) => this.translationChange.emit(val));
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.translationKeyChangeDebounce$.unsubscribe();
    this.translationChangeDebounce$.unsubscribe();
  }

  onTranslationKeyChange(oldKey: string, newKey: string) {
    this.translationKeyChangeDebounce$.next({
      oldKey,
      newKey
    });
  }

  onTranslationChange() {
    this.translationChangeDebounce$.next(this.translation);
  }

  onTranslationDelete() {
    this.translationDelete.emit(this.translation);
  }
}
