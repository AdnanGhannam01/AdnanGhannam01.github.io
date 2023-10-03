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
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService, MessageService } from 'primeng/api';
import { InformationComponent } from './profile/information/information.component';
import { CollectionComponent } from './profile/collection/collection.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { TableModule } from "primeng/table";
import { NotFoundComponent } from './not-found/not-found.component';
import { TreeModule } from 'primeng/tree';
import { TooltipModule } from "primeng/tooltip";
import { ToastModule } from "primeng/toast";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { QuestionsComponent } from './toolkit/questions/questions.component';
import { QuestionComponent } from './question/question.component';
import { DataViewModule } from "primeng/dataview";
import { DropdownModule } from "primeng/dropdown";
import { MyQuestionsComponent } from './profile/my-questions/my-questions.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { EditorModule } from "primeng/editor";
import { SkeletonModule } from "primeng/skeleton";
import { ServerErrorComponent } from './server-error/server-error.component';
import { InputMaskModule } from "primeng/inputmask";
import { MessagesModule } from "primeng/messages";



@NgModule({
  declarations: [
    HomeComponent,
    ToolkitComponent,
    ArticleComponent,
    ProfileComponent,
    TutorialsComponent,
    ReferencesComponent,
    LoginComponent,
    RegisterComponent,
    InformationComponent,
    CollectionComponent,
    ChangePasswordComponent,
    NotFoundComponent,
    QuestionsComponent,
    QuestionComponent,
    MyQuestionsComponent,
    AskQuestionComponent,
    ServerErrorComponent
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
    DividerModule,
    InputTextModule,
    PasswordModule,
    ConfirmDialogModule,
    TableModule,
    TreeModule,
    TooltipModule,
    ToastModule,
    BreadcrumbModule,
    DataViewModule,
    DropdownModule,
    EditorModule,
    SkeletonModule,
    InputMaskModule,
    MessagesModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class PagesModule { }
