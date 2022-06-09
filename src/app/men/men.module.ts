import { NgModule } from '@angular/core';
import { MenRoutingModule } from "./men-routing.module";

import { MenPageComponent } from './pages'
import { AppModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    MenPageComponent,
  ],
  imports: [
    MenRoutingModule,
    AppModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: []
})
export class MenModule {
}
