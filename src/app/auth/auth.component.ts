import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error_heading: string = 'An Error Occured!';
  error_message: string = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.auth.login(email, password);
    } else {
      authObs = this.auth.signup(email, password);
    }

    authObs.subscribe(
      (resData) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        this.error_message = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onHandleAlert() {
    this.error_message = null;
  }
}
