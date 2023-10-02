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
import { LoadingComponent } from './loading/loading.component';
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { DividerModule } from 'primeng/divider';
import { HomeListItemComponent } from './home-list-item/home-list-item.component';
import { EditorControlsComponent } from './editor-controls/editor-controls.component';



@NgModule({
  declarations: [
    LogoComponent,
    NavbarComponent,
    ListItemComponent,
    FooterComponent,
    TabmenuComponent,
    ToolkitSearchComponent,
    CardComponent,
    LoadingComponent,
    HomeListItemComponent,
    EditorControlsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    DialogModule,
    MenuModule,
    ButtonModule,
    SidebarModule,
    ProgressSpinnerModule,
    DividerModule
  ],
  exports: [
    LogoComponent,
    NavbarComponent,
    ListItemComponent,
    FooterComponent,
    TabmenuComponent,
    ToolkitSearchComponent,
    CardComponent,
    LoadingComponent,
    HomeListItemComponent,
    EditorControlsComponent
  ],
})
export class SharedModule { }
