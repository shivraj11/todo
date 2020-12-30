import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorKeys } from '../../interfaces/error-keys.enum';

@Component({
  selector: 'error-messages, [errorMessages]',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  //   host: {
  //   class: 'invalid-feedback'
  // }

})
export class MessagesComponent implements OnInit {
  @HostBinding('class.invalid-feedback')
  @Input()
  public control: AbstractControl;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * List of error strings
   */
  public get errors(): string[] {
    const errors = this.control.errors;
    const errorMessages: string[] = [];
    // if no errors then returning blank
    if (!errors) {
      return [];
    }

    const errorKeys: ErrorKeys[] = Object.keys(errors) as any;
    // console.log(errorKeys);

    for (const errorKey of errorKeys) {
      switch (errorKey) {

        case ErrorKeys.Required:
          errorMessages.push('The field is required');
          break;
        case ErrorKeys.Email:
          errorMessages.push('The field has incorrect email');
          break;

        case ErrorKeys.MinLength:
          errorMessages.push('The length must be minimum 2 character');
          break;

        case ErrorKeys.MaxLength:
          errorMessages.push('The length must not be greater than 5 character');
          break;

        case ErrorKeys.Min:
          errorMessages.push('The value must be greater than or equal to 5');
          break;

        case ErrorKeys.Max:
          errorMessages.push('The value must be less than or equal to 10');
          break;
        case ErrorKeys.Pattern:
          errorMessages.push('The field only contains letters or spaces');
          break;

        default:
          errorMessages.push('The field has invalid value');

      }
    }


    return errorMessages;
  }

  /**
   * Returns true if errors are to be shown
   */
  public get showErrors(): boolean {
    return this.control.touched;
  }
}
