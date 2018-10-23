import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material';
import {Translation} from '../../types/translation.type';


@Component({
  selector: 'app-translation-new-form',
  templateUrl: './translation-new-form.component.html',
  styleUrls: ['./translation-new-form.component.css']
})
export class TranslationNewFormComponent implements OnInit {

  @Input() languages: string[];
  @Input() translations: Translation[] = [];

  @Output() create = new EventEmitter<Translation>();
  @Output() cancel = new EventEmitter<void>();

  translation: Translation = TranslationNewFormComponent.getEmptyTranslation();

  keyFormControl = new FormControl('', [
    Validators.required,
    (control: AbstractControl) => {
      if (this.translations.find((value => value.key === control.value)) === undefined) {
        return null;
      } else {
        return {'keyIsTaken': {value: control.value}};
      }
    }
  ]);

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
    if (!this.keyFormControl.valid) {
      this.keyFormControl.markAsDirty();
      return;
    }

    this.create.emit(this.translation);

    this.translation = TranslationNewFormComponent.getEmptyTranslation();
  }

  onCancel() {
    this.translation = TranslationNewFormComponent.getEmptyTranslation();

    this.cancel.emit();
  }
}
