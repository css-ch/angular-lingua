import {Directive, Input} from '@angular/core';
import {FormControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {Translation} from '../types/translation.type';


@Directive({
  selector: '[keyTaken][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: KeyTakenValidatorDirective, multi: true}
  ]
})
export class KeyTakenValidatorDirective implements Validator {
  @Input('keyTaken') translations$: BehaviorSubject<Translation[]>;
  @Input() keyTakenIgnore: string;

  constructor() {
  }

  validate(control: FormControl) {
    if (control.value === this.keyTakenIgnore) {
      return null;
    } else if (this.translations$.value.find((value => value.key === control.value)) === undefined) {
      return null;
    } else {
      return {'keyIsTaken': {value: control.value}};
    }
  }

}
