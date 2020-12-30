import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '../error-handling/error-handling.module';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  { path: 'todo-list', component: TodoListComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit', component: EditComponent }
];

@NgModule({
  declarations: [TodoListComponent, CreateComponent, EditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorHandlingModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes)
  ],
  exports: [TodoListComponent]
})
export class TodoModule { }
