import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './components/messages/messages.component';
import { InputValidDirective } from './directives/input-valid/input-valid.directive';
import { FormValidDirective } from './directives/form-valid/form-valid.directive';



@NgModule({
  declarations: [MessagesComponent, InputValidDirective, FormValidDirective],
  imports: [
    CommonModule
  ],
  exports: [MessagesComponent, InputValidDirective, FormValidDirective]
})
export class ErrorHandlingModule { }
