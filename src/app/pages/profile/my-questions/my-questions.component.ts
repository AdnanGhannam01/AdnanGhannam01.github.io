import { Component } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { catchError, throwError } from 'rxjs';
import { Question } from 'src/app/services';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'docs-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.scss'],
  providers: [ConfirmationService]
})
export class MyQuestionsComponent {
  loading = true;
  #questions?: Question[];
  get questions(): Question[] | undefined { return this.#questions }
  set questions(val: Question[]) {
    this.#questions = val;
    if (!val.length) {
      this.messages = [{ severity: 'info', detail: 'You didn\'t write any question '}];
    } else {
      this.messages = [];
    }
  }


  messages: Message[] = [];

  constructor(private userService: UserService,
              private questionService: QuestionService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.userService.getMyQuestions()
      .pipe(catchError(() => {
        const message = "Something went wrong, please try again later.";
        this.messages = [{ severity: 'error', detail: message }];
        this.loading = false;
        return throwError(message);
      }))
      .subscribe(({ data }) => {
        this.questions = data;
        this.loading = false;
      });
  }

  onSearch(table: Table, input: HTMLInputElement) {
    table.filterGlobal(input.value, 'contains');
  }

  showConfirmDialog(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this question?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.remove(id);
      },
      reject: () => { }
    });
  }

  remove(id: string) {
    this.questionService.remove(id)
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question deleted' });
          this.questions = this.questions!.filter(question => question._id != id);
        },
        error: (err) => {
          err.error.errors.forEach(
            (error: any) => 
              this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
        }
      });
  }
}
