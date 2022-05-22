import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  loginForm: FormGroup;


  constructor() {
    this.loginForm = new FormGroup({
      login: new FormControl(undefined, [Validators.required, Validators.email]),
      password: new FormControl(undefined, [
        Validators.required,
        Validators.maxLength(24),
        Validators.minLength(6)
      ]),
      rememberMe: new FormControl(undefined),
    })
  }

}
