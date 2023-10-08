import { Component, HostListener, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { InputValidationService } from 'src/app/services/input-validation.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'docs-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
export class AskQuestionComponent {
  title = "";
  content = "";
  loading = false;
  dataSaved = false;

  @ViewChild("editForm") editForm?: NgForm;

  constructor(private questionService: QuestionService,
              private activedRoute: ActivatedRoute,
              private inputValidationService: InputValidationService,
              private messageService: MessageService,
              private router: Router) { }

  hasChanged() {
    const form = this.editForm?.form;

    if (form) return form.dirty;

    return false;
  }

  cannotLeave() {
    if (this.dataSaved) return false; // Can Leave
    if (this.hasChanged()) return true;
    return false;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.cannotLeave()) {
      $event.returnValue = true;
    }
  }

  onSubmit({ form }: NgForm) {
    const error = this.inputValidationService.validate(form);

    if (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
      return;
    }

    this.activedRoute.paramMap.subscribe(params => {
      const id = params.get("id");
      if (id) {
        this.loading = true;
        this.questionService.create(id, this.title, this.content)
          .subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question Sent' });
              this.loading = false;
              this.dataSaved = true;
              setTimeout(() => {
                this.router.navigate(['toolkits', id, 'questions']);
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
    });
  }
}
