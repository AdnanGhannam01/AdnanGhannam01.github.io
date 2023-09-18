import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ToolkitComponent } from './pages/toolkit/toolkit.component';
import { ArticleComponent } from './pages/article/article.component';
import { SignComponent } from './pages/sign/sign.component';

const routes: Routes = [
  { path: "toolkits/:id", component: ToolkitComponent },
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
