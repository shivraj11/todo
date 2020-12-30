import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo/todo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { delay, finalize } from 'rxjs/operators';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent extends CreateComponent {

  /**
   * Storing ID for editable data via queryParams
   */
  public todoId: string;


  constructor(
    public router: Router,
    public todoService: TodoService,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService,
    public activatedRoute: ActivatedRoute
  ) {
    super(router, todoService, spinner, toastr);
  }


  public setupForm(): void {
    super.setupForm();
    this.getSetupFormById(this.activatedRoute.snapshot.queryParams.id);
  }

  public getSetupFormById(id: number): void {
    this.todoService.show(id)
      .subscribe(data => {
        console.log(data);
        this.form.patchValue(data);
      },
        error => {
          console.log(error);
        });
  }

  public save(): void {
    this.spinner.show();
    console.log(this.form.getRawValue());
    this.todoService.update(this.form.getRawValue())

      .pipe(delay(1000))
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(() => {
        this.toastr.success('Task Updated Successfully');
        this.router.navigate(['todo', 'todo-list']);
      },
        () => {
          this.toastr.error('Something went wrong');
        });
  }

}
