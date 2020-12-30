import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '../error-handling/error-handling.module';
import { RedirectedIfAuthenticatedGuard } from '../guards/redirect-if-authenticated/redirected-if-authenticated.guard';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [RedirectedIfAuthenticatedGuard]},
  {path: 'register', component: RegisterComponent}
];


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
     ReactiveFormsModule,
     ErrorHandlingModule,
     NgxSpinnerModule,
    RouterModule.forChild(routes)
  ]

})
export class AuthenticationModule { }
