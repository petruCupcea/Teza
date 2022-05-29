import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharePageComponent } from './pages';


const routes: Routes = [
  {path: 'share', component: SharePageComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ShareMarketRoutingModule {
}
