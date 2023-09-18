import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ToolkitComponent } from './pages/toolkit/toolkit.component';
import { ArticleComponent } from './pages/article/article.component';
import { SignComponent } from './pages/sign/sign.component';
import { TutorialsComponent } from './pages/toolkit/tutorials/tutorials.component';
import { ReferencesComponent } from './pages/toolkit/references/references.component';

const routes: Routes = [
  {
    path: "toolkits/:id",
    component: ToolkitComponent,
    children: [
      { path: "", component: TutorialsComponent },
      { path: "references", component: ReferencesComponent }
    ]
  },
  { path: "article/:id", component: ArticleComponent },
  // TODO MAKE THOSE PAGES
  { path: "login", component: SignComponent },
  { path: "register", component: SignComponent },
  { path: "", component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
