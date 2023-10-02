import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ToolkitComponent } from './pages/toolkit/toolkit.component';
import { ArticleComponent } from './pages/article/article.component';
import { TutorialsComponent } from './pages/toolkit/tutorials/tutorials.component';
import { ReferencesComponent } from './pages/toolkit/references/references.component';
import { SignComponent } from './templates/sign/sign.component';
import { MainComponent } from './templates/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PreventLoggedInAccessGuard } from './guards/prevent-logged-in-access.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { InformationComponent } from './pages/profile/information/information.component';
import { CollectionComponent } from './pages/profile/collection/collection.component';
import { ChangePasswordComponent } from './pages/profile/change-password/change-password.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { QuestionsComponent } from './pages/toolkit/questions/questions.component';
import { QuestionComponent } from './pages/question/question.component';
import { MyQuestionsComponent } from './pages/profile/my-questions/my-questions.component';
import { AskQuestionComponent } from './pages/ask-question/ask-question.component';
import { PreventUnauthenticateAccessGuard } from './guards/prevent-unauthenticate-access.guard';
import { BlockNavigationIfChangeGuard } from './guards/block-navigation-if-change.guard';
import { ServerErrorComponent } from './pages/server-error/server-error.component';

const routes: Routes = [
  {
    path: "s",
    component: SignComponent,
    canActivate: [PreventLoggedInAccessGuard],
    children: [
      {
        path: "login",
        component: LoginComponent,
        title: "Login"
      },
      {
        path: "register",
        component: RegisterComponent,
        title: "Register"
      }
    ]
  },
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "toolkits/:id",
        component: ToolkitComponent,
        children: [
          { path: "", component: TutorialsComponent },
          { path: "references", component: ReferencesComponent },
          { path: "questions", component: QuestionsComponent }
        ]
      },
      { path: "articles/:id", component: ArticleComponent },
      { path: "questions/:id", component: QuestionComponent },
      {
        path: "profile",
        component: ProfileComponent,
        canActivate: [PreventUnauthenticateAccessGuard],
        children: [
          {
            path: "",
            component: InformationComponent,
            title: "Profile - Information"
          },
          {
            path: "collection", 
            component: CollectionComponent,
            title: "Profile - Collection"
          },
          {
            path: "change-password",
            component: ChangePasswordComponent,
            title: "Profile - Change Password"
          },
          {
            path: "my-questions",
            component: MyQuestionsComponent,
            title: "Profile - My Questions"
          },
        ]
      },
      { 
        path: "ask-question/:id", 
        component: AskQuestionComponent,
        canActivate: [PreventUnauthenticateAccessGuard],
        canDeactivate: [BlockNavigationIfChangeGuard]
      },
      { path: "500-server-error", component: ServerErrorComponent },
      {
        path: "",
        component: HomeComponent,
        title: "TechStack - Home"
      },
      { path: "**", component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', 
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
