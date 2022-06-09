import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnRefundsComponent } from './pages';


const routes: Routes = [
  {path: 'return-refunds', component: ReturnRefundsComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ReturnRefundsRoutingModule {
}
