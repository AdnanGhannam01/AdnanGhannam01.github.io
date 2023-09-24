import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Question } from 'src/app/services';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'docs-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.scss']
})
export class MyQuestionsComponent {
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

  constructor(private questionService: QuestionService,
              private messageService: MessageService) { }

  ngOnInit() {
    // TODO fetch
  }

  onSearch(table: Table, input: HTMLInputElement) {
    table.filterGlobal(input.value, 'contains');
  }

  remove(id: string) {
    // TODO remove
  }
}
