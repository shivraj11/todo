import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay, finalize, toArray } from 'rxjs/operators';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo/todo.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {


  public todos: Todo[] = [];
  constructor(private router: Router, private todoService: TodoService, private toastr: ToastrService, public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.loadAllTodoList();
  }

  public loadAllTodoList(): void {
    this.todoService.list()
      .pipe(toArray())
      .subscribe(
        (data) => {
          console.log(data);
          this.todos = data;
        },
        error => {
          console.log(error);
        });
  }

  edit(id): void {
    console.log(id);
    this.router.navigate(['todo', 'edit'], { queryParams: { id, mode: 'edit' } });
  }

  public delete(id): void {
    this.todoService.remove(id)
      .subscribe(
        () => {
          this.toastr.success('Task Deletd Successfully');
          this.loadAllTodoList();
        },
        error => {
          console.log(error);
        });

  }

  public markComplete(todo): void {
    this.spinner.show();

    this.todoService.updateCompletedTask(todo)
      .pipe(delay(1000))
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(() => {
        this.toastr.success('Task Updated Successfully');
        this.loadAllTodoList();
      },
        () => {
          this.toastr.error('Something went wrong');
        });
  }

}

