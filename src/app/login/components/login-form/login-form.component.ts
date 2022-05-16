import { Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      login: new FormControl(),
      password: new FormControl(),
    })
  }

}
