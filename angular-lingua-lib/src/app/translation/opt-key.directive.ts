import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appOptKey]'
})
export class OptKeyDirective {

  @Input('appOptKey') optKey: string;

  constructor(public templateRef: TemplateRef<any>) {
  }
}
