import { NgModule } from '@angular/core';

import { ShareMarketRoutingModule } from './share-market-routing.module';
import { ProductPageComponent, SharePageComponent } from './pages'


@NgModule({
  declarations: [
    SharePageComponent,
    ProductPageComponent,
  ],
  imports: [
    ShareMarketRoutingModule,
  ],
  exports: [],
  providers: [],
  bootstrap: []
})
export class ShareMarketModule {
}
