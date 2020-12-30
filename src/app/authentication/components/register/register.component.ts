import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {delay, finalize} from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  /**
   * Form group
   */
  public form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.setupForm();
  }

  protected setupForm(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public register(): void {
    this.spinner.show();
    this.authService.register(this.form.getRawValue())
      .pipe(delay(2000), finalize(() => {
        this.spinner.hide();
      }))
      .subscribe(
        (data) => {
          console.log(data);
          this.form.reset();
          this.toastr.success('Please Login', `Registered successful : ${data.firstName}`);
          this.router.navigate(['/']);
        },
        error => {
            this.toastr.error(`Please Use Different Email Id.`, error);
        });
  }

}
