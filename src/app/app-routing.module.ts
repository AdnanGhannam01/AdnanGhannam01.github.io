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

const routes: Routes = [
  {
    path: "s",
    component: SignComponent,
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
          { path: "references", component: ReferencesComponent }
        ]
      },
      { path: "article/:id", component: ArticleComponent },
      { path: "", component: HomeComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
