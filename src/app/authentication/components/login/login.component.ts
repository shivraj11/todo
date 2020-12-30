import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * Form group
   */
  public form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService

  ) { }


  ngOnInit(): void {

    this.setupForm();
  }

  protected setupForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  public login(): void {
    this.spinner.show();
    const formValue = this.form.value;
    this.authService.login(formValue.email, formValue.password)
      .pipe(delay(2000), first(), finalize(() => {
        this.spinner.hide();
      }))
      .subscribe(
        data => {
          this.form.reset();
          this.toastr.success(`Welcome ${data.firstName}`);
          this.router.navigate(['/home']);
        },
        error => {
          this.toastr.error(error);
          console.log(error);
        });
  }
}
