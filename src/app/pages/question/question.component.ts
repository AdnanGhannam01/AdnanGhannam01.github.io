import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import { Answer, Question } from 'src/app/services';
import { AuthService } from 'src/app/services/auth.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'docs-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  id = "";
  isLoggedIn = false;
  loading = false;

  sortOptions: SelectItem[] = [];

  sortOrder: number = 1;

  sortField: string = "";

  question?: Question;
  answer = "";

  constructor(private activedRoute: ActivatedRoute,
              private questionService: QuestionService,
              private authService: AuthService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit() {
    this.sortOptions = [
      { label: 'Votes High to Low', value: '!votes' },
      { label: 'Votes Low to High', value: 'votes' }
    ];

    this.isLoggedIn = this.authService.isLoggedIn();

    this.activedRoute.paramMap.subscribe(params => {
      this.id = params.get("id") ?? "";
      
      if (this.id) {
        this.questionService.getOne(this.id)
          .subscribe({
            next: ({ data }) => {
              this.question = data;
            },
            error: err => {
              this.router.navigate(["/not-found"]);
            }
          });
      }
    });
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  sendAnswer() {
    this.questionService.sendAnswer(this.id, this.answer)
      .subscribe({
        next: () => {
          this.loading = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Answer Sent' });
          setTimeout(() => {
            location.reload();
          }, 1500);
        },
        error: (err) => {
          this.loading = false;
          err.error.errors.forEach(
            (error: any) => 
              this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
        }
      });
  }

  isOwner(id: string) { return this.authService.isOwner(id) }

  deleteQuestion() {
    this.questionService.remove(this.id)
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question deleted' });
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1500);
        },
        error: (err) => {
          err.error.errors.forEach(
            (error: any) => 
              this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
        }
      });
  }

  deleteAnswer(id: string) {
    this.questionService.removeAnswer(id)
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Answer deleted' });
          setTimeout(() => {
            location.reload();
          }, 1500);
        },
        error: (err) => {
          err.error.errors.forEach(
            (error: any) => 
              this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
        }
      });
  }
}
