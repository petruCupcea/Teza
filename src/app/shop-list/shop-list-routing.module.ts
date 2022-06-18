import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopListPageComponent } from './pages';


const routes: Routes = [
  {path: 'shop-list', component: ShopListPageComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ShopListRoutingModule {
}
