import { NgModule } from "@angular/core";
import { ShopListPageComponent } from './pages';
import { ShopListRoutingModule } from './shop-list-routing.module';
import { ProductItemComponent } from "./components";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";


@NgModule({
  declarations: [
    ShopListPageComponent,
    ProductItemComponent,
  ],
  imports: [
    ShopListRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: []
})
export class ShopListModule {
}
