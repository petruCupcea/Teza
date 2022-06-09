import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CategoryCardComponent } from "./components";
import { MatRippleModule } from "@angular/material/core";


@NgModule({
  declarations: [
    CategoryCardComponent,
  ],
  imports: [
    MatCardModule,
    MatRippleModule,
  ],
  exports: [
    CategoryCardComponent,
  ],
  providers: [],
})
export class AppModule {
}
