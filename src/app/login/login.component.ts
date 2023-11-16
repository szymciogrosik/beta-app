import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthService} from '../_services/auth/auth.service';
import {SnackbarService} from '../_services/util/snackbar.service';
import {CustomTranslateService} from "../_services/translate/custom-translate.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  hidePassword: boolean = true;
  returnUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private translateService: CustomTranslateService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get formControls(): { [key: string]: AbstractControl; } {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.serverError = '';
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(JSON.stringify(this.loginForm.value))
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.router.navigate([this.returnUrl]).then()
        },
        error: (error) => {
          this.serverError = error;
          this.snackbarService.openDefaultSnackBar(error);
          this.loading = false;
        }
      });
  }

  @Input() serverError: string | null;

  getEmailErrorMessage(): string {
    if (this.formControls['email'].hasError('required')) {
      return this.translateService.get('login.validation.mandatoryPassword');
    }

    return this.formControls['email'].hasError('email')
      ? this.translateService.get('login.validation.invalidEmail')
      : '';
  }

}
