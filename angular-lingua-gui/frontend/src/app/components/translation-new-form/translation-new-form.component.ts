import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {Translation} from '../../types/translation.type';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-translation-new-form',
  templateUrl: './translation-new-form.component.html',
  styleUrls: ['./translation-new-form.component.css']
})
export class TranslationNewFormComponent implements OnInit {

  @Input() languages: string[];
  @Input() translations: Translation[];

  @Output() create = new EventEmitter<Translation>();
  @Output() cancel = new EventEmitter<void>();

  translation: Translation = TranslationNewFormComponent.getEmptyTranslation();

  formErrors: Translation = TranslationNewFormComponent.getEmptyTranslation();

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
    if (this.translation.key === '') {
      this.formErrors.key = 'key can not be empty';
      return;
    }

    if (this.translations.find((value => this.translation.key === value.key)) !== undefined) {
      this.formErrors.key = 'This Key already exists';
      return;
    }

    this.create.emit(this.translation);

    this.translation = TranslationNewFormComponent.getEmptyTranslation();
    this.formErrors = TranslationNewFormComponent.getEmptyTranslation();
  }

  onCancel() {
    this.translation = TranslationNewFormComponent.getEmptyTranslation();
    this.formErrors = TranslationNewFormComponent.getEmptyTranslation();

    this.cancel.emit();
  }
}
