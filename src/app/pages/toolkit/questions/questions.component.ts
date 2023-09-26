import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/services';
import { AuthService } from 'src/app/services/auth.service';
import { QuestionService } from 'src/app/services/question.service';

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

  constructor(private activedRoute: ActivatedRoute,
              private auth: AuthService,
              private questionService: QuestionService) { }

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
            },
            error: (err) => { this.loading = false }
          });
      }
    });
  }
}
