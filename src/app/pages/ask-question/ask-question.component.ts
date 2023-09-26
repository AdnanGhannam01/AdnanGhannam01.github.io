import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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

  constructor(private questionService: QuestionService,
              private activedRoute: ActivatedRoute,
              private messageService: MessageService,
              private router: Router) { }


  onSubmit() {
    this.activedRoute.paramMap.subscribe(params => {
      const id = params.get("id");
      if (id) {
        this.loading = true;
        this.questionService.create(id, this.title, this.content)
          .subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question Sent' });
              this.loading = false;
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
