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
  questions: Question[] = []; 

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
