import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ToolkitComponent } from './toolkit/toolkit.component';
import { ArticleComponent } from './article/article.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { TutorialsComponent } from './toolkit/tutorials/tutorials.component';
import { ReferencesComponent } from './toolkit/references/references.component';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from "primeng/inputtextarea";
import { FormsModule } from '@angular/forms';
import { DividerModule } from "primeng/divider";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    HomeComponent,
    ToolkitComponent,
    ArticleComponent,
    ProfileComponent,
    TutorialsComponent,
    ReferencesComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    MenuModule,
    DialogModule,
    InputTextareaModule,
    DividerModule
  ]
})
export class PagesModule { }
