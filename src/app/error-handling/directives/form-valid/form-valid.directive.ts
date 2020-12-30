import { Directive, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[errorFormValid]'
})
export class FormValidDirective {

  @Input()
  public errorFormValid: FormGroup;

  constructor() { }

  @HostListener('click', ['$event'])
  public checkForm($event: Event): void {
    if (this.errorFormValid.invalid) {
      this.errorFormValid.markAllAsTouched();
      $event.preventDefault();
    }
  }
}
