import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { Answer, Question } from 'src/app/services';
import { AuthService } from 'src/app/services/auth.service';
import { HighlightService } from 'src/app/services/highlight.service';
import { InputValidationService } from 'src/app/services/input-validation.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'docs-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  id = "";
  isLoggedIn = false;
  loading = true;
  sending = false;

  sortOptions: SelectItem[] = [];

  sortOrder: number = 1;

  sortField: string = "";

  question?: Question;
  questionMenu: MenuItem[] = [
    {
      label: "Edit",
      icon: "pi pi-pencil",
      command: () => {
        this.startEditingQuestion();
      }
    },
    {
      label: "Open-Close Question",
      icon: "pi pi-lock-open",
      command: () => {
        this.toggleQuestion();
      }
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => {
        this.deleteQuestion();
      }
    },
  ];

  newAnswerContent = "";

  editingQuestion?: Question;
  editingAnswer?: Answer;

  breadcrumbItems: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor(private activedRoute: ActivatedRoute,
              private questionService: QuestionService,
              private authService: AuthService,
              private inputValidationService: InputValidationService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private highlightService: HighlightService,
              private router: Router) { }

  ngOnInit() {
    this.sortOptions = [
      { label: 'Votes High to Low', value: '!votesValue' },
      { label: 'Votes Low to High', value: 'votesValue' }
    ];

    this.isLoggedIn = this.authService.isLoggedIn();

    this.activedRoute.paramMap.subscribe(params => {
      this.id = params.get("id") ?? "";
      
      if (this.id) {
        this.questionService.getOne(this.id)
          .subscribe({
            next: ({ data }) => {
              console.log(data)
              this.question = data;

              this.question.isOwner = this.authService.isOwner(data.user._id);
              this.question.up = this.didVote(this.question, 1);
              this.question.votesValue = this.getVotesCount(data);

              this.question.answers.forEach(answer => {
                answer.up = this.didVote(answer, 1);
                answer.isOwner = this.authService.isOwner(answer.user._id);
                answer.votesValue = this.getVotesCount(answer);
                answer.menuItems = this.getAnswerMenu(answer);
              });

              this.home = { icon: 'pi pi-home', routerLink: '/' };
              this.breadcrumbItems = [
                {
                  label: data.toolkit.name,
                  url: `/toolkits/${data.toolkit._id}` 
                },
                { label: data.title }
              ];

              this.highlightService.apply();

              this.loading = false;
            },
            error: err => {
              this.router.navigate(["/not-found"]);
            }
          });
      }
    });
  }

  getAnswerMenu(answer: Answer): MenuItem[] {
    return [
      {
        label: "Edit",
        icon: "pi pi-pencil",
        command: () => {
          this.startEditingAnswer(answer)
        },
        visible: answer.isOwner
      },
      {
        label: "Mark As Correct",
        icon: "pi pi-check",
        command: () => {
          this.markAsCorrect(answer._id);
        },
        visible: this.question?.isOwner
      },
      {
        label: "Delete",
        icon: "pi pi-trash",
        command: () => {
          this.deleteAnswer(answer._id)
        }
      },
    ];
  }

  onSortChange(event: any) {
    let value = event.value;
    console.log(value)

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  getVotesCount(item: Question | Answer) {
    return item.votes.reduce((total, vote) => total += vote.value, 0);
  }

  didVote(item: Question | Answer, value: 1 | -1) {
    const userId = this.authService.getSession().id;
    const vote = item.votes.find(vote => vote.user == userId)

    if (!vote) return null;

    return vote.value == value;
  }

  voteChange(item: Question | Answer, option: boolean) {
    const increment = item.up === null ? 1 : 2;

    item.up = item.up === option ? null : option;

    if (item.up == null) {
      this.questionService.unvote(item)
        .subscribe(() => {
          item.votesValue -= option ? 1 : -1;
          console.info("Unvoted");
        });
      return;
    }

    this.questionService.vote(item, item.up)
      .subscribe(() => {
        item.votesValue += item.up ? increment : -increment;
        console.info("Voted");
      });
  }

  sendAnswer({ form }: NgForm) {
    const error = this.inputValidationService.validate(form);

    if (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
      return;
    }

    this.questionService.sendAnswer(this.id, this.newAnswerContent)
      .subscribe({
        next: () => {
          this.sending = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Answer Sent' });
          setTimeout(() => {
            location.reload();
          }, 1500);
        },
        error: (err) => {
          this.sending = false;
          err.error.errors.forEach(
            (error: any) => 
              this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
        }
      });
  }

  startEditingQuestion() {
    if (!this.question) { return }

    this.editingQuestion = { ...this.question };
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

  toggleQuestion() {
    if (!this.question) { return }
    this.questionService.toggleQuestion(this.question._id, !this.question.isOpen)
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success' });
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

  markAsCorrect(id: string) {
    this.questionService.markAsCorrect(id)
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Answer Marked' });
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
