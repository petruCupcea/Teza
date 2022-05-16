import { NgModule } from '@angular/core';
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";

import { LoginPageComponent } from "./pages";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { LoginFormComponent, RegisterFormComponent } from "./components";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";


@NgModule({
  declarations: [
    LoginFormComponent,
    LoginPageComponent,
    RegisterFormComponent,
  ],
  imports: [
    MatTabsModule,
    MatCardModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  exports: [
    LoginPageComponent,
  ],
  providers: [],
})
export class LoginModule { }
