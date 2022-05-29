import { NgModule } from '@angular/core';

import { FilterMenuComponent } from "./components";
import { ProductPageComponent, SharePageComponent } from './pages'
import { ShareMarketRoutingModule } from './share-market-routing.module';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";


@NgModule({
  declarations: [
    FilterMenuComponent,
    SharePageComponent,
    ProductPageComponent,
  ],
  imports: [
    ShareMarketRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
  ],
  exports: [],
  providers: [],
  bootstrap: []
})
export class ShareMarketModule {
}
