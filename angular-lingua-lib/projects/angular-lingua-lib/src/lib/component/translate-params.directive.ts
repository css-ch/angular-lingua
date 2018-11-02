import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[translateParams]'
})
export class TranslateParamsDirective {

  @Input('translateParams') optKey: string;

  constructor(public templateRef: TemplateRef<any>) {
  }
}
