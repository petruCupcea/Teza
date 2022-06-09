import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login';
import { MenuModule } from './menu';
import { CartModule } from './cart';
import { ReturnRefundsModule } from './return-refunds';
import { MenModule } from './men';
import { FooterModule } from './footer';


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
    ReturnRefundsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
