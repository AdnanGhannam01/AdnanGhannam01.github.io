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

  questions: Question[] = [
    {
      _id: "",
      title: "How to use angular cli",
      content: "",
      answers: [],
      createdAt: Date.now(),
      lastModifyAt: Date.now(),
      views: 10,
      votes: -3
    },
    {
      _id: "",
      title: "How to use angular cli How to use angular cli 22How to use angular cli 2",
      content: "",
      answers: [],
      createdAt: Date.now(),
      lastModifyAt: Date.now(),
      views: 100,
      votes: 22 
    }
  ];

  constructor(private activedRoute: ActivatedRoute,
              private questionService: QuestionService) { }

  ngOnInit() {
    this.activedRoute.parent?.paramMap.subscribe(params => {
      this.id = params.get("id") ?? "";
      
      if (this.id) {
        // this.sectionService.getAll(id, "reference")
        //   .subscribe({
        //     next: ({ data }) => {
        //       this.sections = data;
        //     },
        //     error: err => {
        //       console.error("FETCHING ERROR", err.error);
        //     }
        //   });
      }
    });
  }
}
