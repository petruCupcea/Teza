import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartPageComponent, CheckoutPageComponent } from './pages';


const routes: Routes = [
  {path: 'cart-page', component: CartPageComponent},
  {path: 'checkout', component: CheckoutPageComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule {
}
