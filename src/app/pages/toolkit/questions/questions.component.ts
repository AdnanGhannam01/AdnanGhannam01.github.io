import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/services';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'docs-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent {
  id = "";
  loading = true;

  questions: Question[] = [];

  constructor(private activedRoute: ActivatedRoute,
              private questionService: QuestionService) { }

  ngOnInit() {
    this.activedRoute.parent?.paramMap.subscribe(params => {
      const id = params.get("id");

      if (id) {
        this.questionService.getAll(id)
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
