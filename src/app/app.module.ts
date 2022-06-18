import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginModule } from './login';
import { MenuModule } from './menu';
import { CartModule } from './cart';
import { ReturnRefundsModule } from './return-refunds';
import { MenModule } from './men';
import { FooterModule } from './footer';
import { WomenModule } from './women';
import { ShopListModule } from './shop-list';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CartModule,
    FooterModule,
    LoginModule,
    MenuModule,
    MenModule,
    WomenModule,
    ReturnRefundsModule,
    HttpClientModule,
    ShopListModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
