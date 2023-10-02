import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, OperatorFunction, catchError, throwError } from 'rxjs';
import { ApiResponse, Article, Question, Toolkit } from 'src/app/services';
import { ArticleService } from 'src/app/services/article.service';
import { NavigatorService } from 'src/app/services/navigator.service';
import { QuestionService } from 'src/app/services/question.service';
import { ToolkitService } from 'src/app/services/toolkit.service';

@Component({
  selector: 'docs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  obs$: Observable<any>[] = [];
  fetchedData = 0;
  toolkits: Toolkit[] = [];
  topArticles: Article[] = [];
  topQuestions: Question[] = [];

  constructor(private toolkitService: ToolkitService,
              private articleService: ArticleService,
              private navigator: NavigatorService,
              private questionService: QuestionService) { }

  ngOnInit() {
    const toolkits$ = this.toolkitService.getAll()
      .pipe(this.navigator.serverErrorRedirect());
    toolkits$.subscribe(({ data }) => {
      this.toolkits = data;
      this.fetchedData++;
    });

    const topArticles$ = this.articleService.getTop()
      .pipe(this.navigator.serverErrorRedirect());
    topArticles$.subscribe(({ data }) => {
      this.topArticles = data;
      this.fetchedData++;
    });

    const topQuestions$ = this.questionService.getTop()
      .pipe(this.navigator.serverErrorRedirect());
    topQuestions$.subscribe(({ data }) => {
      this.topQuestions = data;
      this.fetchedData++;
    });

    this.obs$.push(toolkits$);
    this.obs$.push(topArticles$);
    this.obs$.push(topQuestions$);
  }
}
