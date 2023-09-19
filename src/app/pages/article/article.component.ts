import { Component } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';

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

  nodes!: TreeNode[];

  ngOnInit() {
    this.nodes = [
      {
        key: '0',
        label: 'Introduction',
        children: [
          { key: '0-0', label: 'What is Angular', data: './', type: 'url' },
          { key: '0-1', label: 'Getting Started', data: 'https://angular.io/guide/setup-local', type: 'url' },
          { key: '0-2', label: 'Learn and Explore', data: 'https://angular.io/guide/architecture', type: 'url' },
          { key: '0-3', label: 'Take a Look', data: 'https://angular.io/start', type: 'url' }
        ]
      },
      {
        key: '1',
        label: 'Components In-Depth',
        children: [
          { key: '1-0', label: 'Component Registration', data: 'https://angular.io/guide/component-interaction', type: 'url' },
          { key: '1-1', label: 'User Input', data: 'https://angular.io/guide/user-input', type: 'url' },
          { key: '1-2', label: 'Hooks', data: 'https://angular.io/guide/lifecycle-hooks', type: 'url' },
          { key: '1-3', label: 'Attribute Directives', data: 'https://angular.io/guide/attribute-directives', type: 'url' }
        ]
      }
    ];
  }

  sendFeedback(el: HTMLTextAreaElement) {
    // TODO send
  }
}
