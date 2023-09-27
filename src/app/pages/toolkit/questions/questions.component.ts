import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/services';
import { AuthService } from 'src/app/services/auth.service';
import { QuestionService } from 'src/app/services/question.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'docs-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent {
  id = "";
  loading = true;
  isLoggedIn = false;

  questions: Question[] = [];
  visibleQuestions: Question[] = [];

  constructor(private activedRoute: ActivatedRoute,
              private auth: AuthService,
              private questionService: QuestionService,
              private searchService: SearchService) { }

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();

    this.activedRoute.parent?.paramMap.subscribe(params => {
      this.id = params.get("id") ?? "";

      if (this.id) {
        this.questionService.getAll(this.id)
          .subscribe({
            next: ({ data }) => {
              this.loading = false;
              this.questions = data;
              this.visibleQuestions = this.questions;
            },
            error: (err) => { this.loading = false }
          });
      }
    });

    this.searchService.valueChange.subscribe(val => {
      this.visibleQuestions = this.questions.filter(question => question.title.toLowerCase().includes(val.toLowerCase()));
    });
  }
}
