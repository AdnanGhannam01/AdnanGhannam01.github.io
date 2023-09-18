import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'docs-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  feedbackVisible = false;

  optionsMenu: MenuItem[] = [
    {
      label: "Save To Collection",
      icon: "pi pi-database",
      command: () => {

      }
    },
    {
      label: "Send a Feedback",
      icon: "pi pi-comment",
      command: () => {
        this.feedbackVisible = true
      }
    }
  ]

  sendFeedback(el: HTMLTextAreaElement) {
    // TODO send
  }
}
