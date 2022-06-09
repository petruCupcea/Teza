import { NgModule } from '@angular/core';
import { CartPageComponent } from './pages';
import { CartRoutingModule } from './cart-routing.module';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";


@NgModule({
  declarations: [
    CartPageComponent,
  ],
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CartRoutingModule,
  ],
  providers: [],
})
export class CartModule {
}
