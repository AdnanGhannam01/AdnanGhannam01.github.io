import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { TemplatesModule } from './templates/templates.module';
import { PreventLoggedInAccessGuard } from './guards/prevent-logged-in-access.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    PagesModule,
    HttpClientModule,
    TemplatesModule
  ],
  providers: [PreventLoggedInAccessGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
