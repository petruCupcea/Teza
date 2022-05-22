import { NgModule } from '@angular/core';

import { FloatingMenuComponent, TopMenuComponent } from './components';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MenuRoutingModule } from "./menu-routing.module";
import { MatMenuModule } from "@angular/material/menu";


@NgModule({
  declarations: [
    FloatingMenuComponent,
    TopMenuComponent,
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MenuRoutingModule,
    MatMenuModule,
  ],
  exports: [
    TopMenuComponent,
  ],
  providers: [],
  bootstrap: []
})
export class MenuModule {
}
