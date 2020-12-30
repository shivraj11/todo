import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, finalize } from 'rxjs/operators';
import { TodoService } from 'src/app/services/todo/todo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  /**
   * Form group
   */
  public form: FormGroup;

  constructor(
    public router: Router,
    public todoService: TodoService,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.setupForm();
  }

  protected setupForm(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
      taskName: new FormControl('', [Validators.required]),
      taskDescription: new FormControl('', [Validators.required]),
      complete: new FormControl(''),
    });
  }


  public save(): void {
    this.spinner.show();
    console.log(this.form.getRawValue());

    this.todoService.save(this.form.getRawValue())
      .pipe(delay(2000))
      .pipe(finalize(() => {
        this.spinner.hide();
      }))
      .subscribe(
        () => {
          // this.form.reset();
          this.toastr.success('Task Added Successfully');
          this.router.navigate(['todo', 'todo-list']);
        },
        () => {
          this.toastr.error('Something went wrong');

        });
  }

}
