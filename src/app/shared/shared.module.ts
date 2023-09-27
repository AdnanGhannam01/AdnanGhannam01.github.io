import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DialogModule } from "primeng/dialog";
import { ListItemComponent } from './list-item/list-item.component';
import { AppRoutingModule } from '../app-routing.module';
import { MenuModule } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import { FooterComponent } from './footer/footer.component';
import { TabmenuComponent } from './tabmenu/tabmenu.component';
import { ToolkitSearchComponent } from './toolkit-search/toolkit-search.component';
import { CardComponent } from './card/card.component';
import { SidebarModule } from 'primeng/sidebar';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LogoComponent,
    NavbarComponent,
    ListItemComponent,
    FooterComponent,
    TabmenuComponent,
    ToolkitSearchComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    DialogModule,
    MenuModule,
    ButtonModule,
    SidebarModule
  ],
  exports: [
    LogoComponent,
    NavbarComponent,
    ListItemComponent,
    FooterComponent,
    TabmenuComponent,
    ToolkitSearchComponent,
    CardComponent
  ],
})
export class SharedModule { }
