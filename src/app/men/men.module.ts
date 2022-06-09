import { NgModule } from '@angular/core';
import { MenRoutingModule } from "./men-routing.module";

import { MenPageComponent } from './pages'

@NgModule({
  declarations: [
    MenPageComponent,
  ],
  imports: [
    MenRoutingModule,
  ],
  providers: [],
  bootstrap: []
})
export class MenModule {
}
