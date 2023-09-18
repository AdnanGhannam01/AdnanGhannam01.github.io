import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DialogModule } from "primeng/dialog";
import { ListItemComponent } from './list-item/list-item.component';
import { AppRoutingModule } from '../app-routing.module';
import { MenuModule } from "primeng/menu";
import { ButtonModule } from "primeng/button";



@NgModule({
  declarations: [
    LogoComponent,
    NavbarComponent,
    ListItemComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    DialogModule,
    MenuModule,
    ButtonModule
  ],
  exports: [
    LogoComponent,
    NavbarComponent
  ],
})
export class SharedModule { }
