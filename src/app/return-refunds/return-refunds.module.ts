import { NgModule } from '@angular/core';

import { ReturnRefundsComponent } from './pages'
import { ReturnRefundsRoutingModule } from './return-refunds-routing.module';

@NgModule({
  declarations: [
    ReturnRefundsComponent,
  ],
  imports: [
    ReturnRefundsRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class ReturnRefundsModule {
}
