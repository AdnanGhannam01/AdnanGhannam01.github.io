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

const routes: Routes = [
  {
    path: "s",
    component: SignComponent,
    canActivate: [PreventLoggedInAccessGuard],
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent }
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
        children: [
          { path: "", component: InformationComponent },
          { path: "collection", component: CollectionComponent },
          { path: "change-password", component: ChangePasswordComponent },
        ]
      },
      { path: "", component: HomeComponent },
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
