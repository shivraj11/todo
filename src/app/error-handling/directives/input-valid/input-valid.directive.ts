import { Directive, HostBinding, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[errorInputValid]'
})
export class InputValidDirective {

  @Input()
  public errorInputValid: AbstractControl;

  constructor() { }

  @HostBinding('class.is-valid')
  public get isValid(): boolean {
    return this.errorInputValid.valid;
  }

  @HostBinding('class.is-invalid')
  public get isInValid(): boolean {
    return this.errorInputValid.invalid && this.errorInputValid.touched;
  }

}
