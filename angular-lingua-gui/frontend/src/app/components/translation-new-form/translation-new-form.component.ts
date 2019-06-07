import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import {BehaviorSubject} from 'rxjs';
import {Translation} from '../../types/translation.type';


@Component({
  selector: 'app-translation-new-form',
  templateUrl: './translation-new-form.component.html',
  styleUrls: ['./translation-new-form.component.css']
})
export class TranslationNewFormComponent implements OnInit {

  @ViewChild('form', { static: true }) public form: NgForm;

  @Input() languages$: BehaviorSubject<string[]>;
  @Input() translations$: BehaviorSubject<Translation[]>;

  @Output() create = new EventEmitter<Translation>();
  @Output() cancel = new EventEmitter<void>();

  translation: Translation = TranslationNewFormComponent.getEmptyTranslation();

  matcher = new ShowOnDirtyErrorStateMatcher();

  constructor() {
  }

  static getEmptyTranslation(): Translation {
    return {
      key: '',
      value: {}
    };
  }

  ngOnInit() {
  }

  onSave() {
    if (!this.form.valid) {
      return;
    }

    this.create.emit(this.translation);


    this.translation = TranslationNewFormComponent.getEmptyTranslation();
    this.form.resetForm();
  }

  onCancel() {
    this.translation = TranslationNewFormComponent.getEmptyTranslation();

    this.cancel.emit();
  }
}
