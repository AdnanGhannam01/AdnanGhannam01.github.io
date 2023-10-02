import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Article, Question, Toolkit } from 'src/app/services';
import { ArticleService } from 'src/app/services/article.service';
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
              private questionService: QuestionService) { }

  ngOnInit() {
    const toolkits$ = this.toolkitService.getAll();
    toolkits$.subscribe(({ data }) => {
      this.toolkits = data;
      this.fetchedData++;
    });

    const topArticles$ = this.articleService.getTop();
    topArticles$.subscribe(({ data }) => {
      this.topArticles = data;
      this.fetchedData++;
    });

    const topQuestions$ = this.questionService.getTop();
    topQuestions$.subscribe(({ data }) => {
      this.topQuestions = data;
      this.fetchedData++;
    });

    this.obs$.push(toolkits$);
    this.obs$.push(topArticles$);
    this.obs$.push(topQuestions$);
  }
}
