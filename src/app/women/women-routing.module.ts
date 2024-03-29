import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WomenPageComponent } from './pages';


const routes: Routes = [
  {path: 'women-page', component: WomenPageComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class WomenRoutingModule {
}
