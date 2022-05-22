import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  registerForm: FormGroup;


  constructor() {
    this.registerForm = new FormGroup({
      name: new FormControl(undefined, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(24)
      ]),
      surname: new FormControl(undefined, [Validators.required]),
      email: new FormControl(undefined, [Validators.required]),
      password: new FormControl(undefined, [Validators.required]),
      repeatPassword: new FormControl(undefined, [Validators.required]),
      terms: new FormControl(undefined, [Validators.required])
    })
  }

}
