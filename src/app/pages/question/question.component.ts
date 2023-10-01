import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import hljs from 'highlight.js';
import { ConfirmEventType, ConfirmationService, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { Editor } from 'primeng/editor';
import { Answer, Question } from 'src/app/services';
import { AuthService } from 'src/app/services/auth.service';
import { QuestionService } from 'src/app/services/question.service';
import Quill from "quill";

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

  editingQuestion?: Question;
  editingAnswer?: Answer;

  constructor(private activedRoute: ActivatedRoute,
              private questionService: QuestionService,
              private authService: AuthService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
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
              this.highlightCodes();
            },
            error: err => {
              this.router.navigate(["/not-found"]);
            }
          });
      }
    });
  }

  highlightCodes() {
    setTimeout(() => {
      const preTags = document.querySelectorAll(".block pre");
      preTags.forEach(pre => {
        hljs.highlightBlock(pre as HTMLElement);
      });
    }, 0);
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

  startEditingQuestion(item: Question) {
    this.editingQuestion = { ...item };
    this.confirmationService.confirm({
      key: "question",
      accept: () => {
        this.editQuestion(this.editingQuestion!.title, this.editingQuestion!.content);
        this.editingQuestion = undefined;
      },
    });
  }

  editQuestion(title: string, content: string) {
    this.questionService.update(this.id, title, content)
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question updated' });
          setTimeout(() => {
            location.reload();
          }, 1000);
        },
        error: (err) => {
          err.error.errors.forEach(
            (error: any) => 
              this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
        }
      });
  }

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

  startEditingAnswer(item: Answer) {
    this.editingAnswer = { ...item };
    this.confirmationService.confirm({
      key: "answer",
      accept: () => {
        this.editAnswer();
        this.editingAnswer = undefined;
      },
    });
  }

  editAnswer() {
    if (this.editingAnswer) {
      this.questionService.updateAnswer(this.editingAnswer._id, this.editingAnswer.content)
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Answer updated' });
            setTimeout(() => {
              location.reload();
            }, 1000);
          },
          error: (err) => {
            err.error.errors.forEach(
              (error: any) => 
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
          }
        });
    }
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
