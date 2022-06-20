import { NgModule } from "@angular/core";
import { ShopListPageComponent } from './pages';
import { ShopListRoutingModule } from './shop-list-routing.module';
import { ProductItemComponent } from "./components";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AppModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


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
    MatFormFieldModule,
    MatInputModule,
    AppModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: []
})
export class ShopListModule {
}
