import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '../error-handling/error-handling.module';
import { TodoModule } from '../todo/todo.module';


const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [HomeComponent, ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
     ErrorHandlingModule,
     TodoModule,
    RouterModule.forChild(routes)
  ],
exports: [HomeComponent]
})
export class HomeModule { }
