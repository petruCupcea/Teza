import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTabsModule } from "@angular/material/tabs";
import { ReactiveFormsModule } from "@angular/forms";

import { LoginPageComponent } from "./pages";
import { LoginFormComponent, RegisterFormComponent } from "./components";
import { LoginRoutingModule } from "./login-routing.module";


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
    LoginRoutingModule,
  ],
  exports: [
    LoginPageComponent,
  ],
  providers: [],
})
export class LoginModule { }
