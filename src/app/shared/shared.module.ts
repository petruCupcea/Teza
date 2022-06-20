import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';

import {
  AsosCardComponent,
  BrandCardComponent,
  CategoryCardComponent,
  SalesBannerComponent,
  TrendingBrandsComponent
} from './components';
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { SearchByPipe } from "./pipes";


@NgModule({
  declarations: [
    AsosCardComponent,
    BrandCardComponent,
    CategoryCardComponent,
    SalesBannerComponent,
    TrendingBrandsComponent,
    SearchByPipe,
  ],
  imports: [
    MatCardModule,
    MatRippleModule,
    MatButtonModule,
    CommonModule,
  ],
  exports: [
    AsosCardComponent,
    BrandCardComponent,
    CategoryCardComponent,
    SalesBannerComponent,
    TrendingBrandsComponent,
    SearchByPipe,
  ],
  providers: [],
})
export class AppModule {
}
