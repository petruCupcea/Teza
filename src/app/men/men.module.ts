import { NgModule } from '@angular/core';
import { MenRoutingModule } from "./men-routing.module";

import { MenPageComponent } from './pages'
import { AppModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    MenPageComponent,
  ],
  imports: [
    MenRoutingModule,
    AppModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: []
})
export class MenModule {
}
