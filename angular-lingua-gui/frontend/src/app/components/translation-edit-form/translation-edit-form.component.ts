import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {Translation} from '../../types/translation.type';

@Component({
  selector: 'app-translation-edit-form',
  templateUrl: './translation-edit-form.component.html',
  styleUrls: ['./translation-edit-form.component.css']
})
export class TranslationEditFormComponent implements OnInit, OnDestroy {

  @ViewChild('form', { static: true }) public form: NgForm;

  @Input() languages$: BehaviorSubject<string[]>;
  @Input() translations$: BehaviorSubject<Translation[]>;
  @Input() translation: Translation;

  @Output() translationKeyChange = new EventEmitter<{ oldKey: string, newKey: string }>();
  @Output() translationChange = new EventEmitter<Translation>();
  @Output() translationDelete = new EventEmitter<Translation>();

  translationKeyChangeDebounce$ = new Subject<{ oldKey: string, newKey: string }>();
  translationChangeDebounce$ = new Subject<Translation>();

  matcher = new ShowOnDirtyErrorStateMatcher();

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
    if (!this.form.valid) {
      return;
    }
    this.translationKeyChangeDebounce$.next({
      oldKey,
      newKey
    });
    this.translation.key = newKey;
  }

  onTranslationChange() {
    if (!this.form.valid) {
      return;
    }
    this.translationChangeDebounce$.next(this.translation);
  }

  onTranslationDelete() {
    this.translationDelete.emit(this.translation);
  }
}
