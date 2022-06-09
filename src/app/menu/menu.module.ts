import { NgModule } from '@angular/core';

import { FloatingMenuComponent, TopMenuComponent } from './components';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MenuRoutingModule } from "./menu-routing.module";
import { MatMenuModule } from "@angular/material/menu";
import { FavoritePageComponent } from "./pages";
import { MatCardModule } from "@angular/material/card";


@NgModule({
  declarations: [
    FloatingMenuComponent,
    TopMenuComponent,
    FavoritePageComponent,
  ],
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MenuRoutingModule,
  ],
  exports: [
    TopMenuComponent,
  ],
  providers: [],
  bootstrap: []
})
export class MenuModule {
}
