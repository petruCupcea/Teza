import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenPageComponent } from './pages';


const routes: Routes = [
  {path: 'men-page', component: MenPageComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MenRoutingModule {
}
