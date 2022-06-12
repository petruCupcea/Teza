import { NgModule } from '@angular/core';
import { CartRoutingModule } from './cart-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CartPageComponent } from './pages';
import { CartItemComponent, NoItemsCard } from './components';
import { MatGridListModule } from "@angular/material/grid-list";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";


@NgModule({
  declarations: [
    CartPageComponent,
    CartItemComponent,
    NoItemsCard,
  ],
  imports: [
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    CartRoutingModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  providers: [],
})
export class CartModule {
}
