import { NgModule } from '@angular/core';

import { WomenRoutingModule } from './women-routing.module';
import { WomenPageComponent } from './pages';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AppModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";


@NgModule({
  declarations: [
    WomenPageComponent,
  ],
  imports: [
    WomenRoutingModule,
    MatProgressSpinnerModule,
    AppModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: []
})
export class WomenModule {
}
