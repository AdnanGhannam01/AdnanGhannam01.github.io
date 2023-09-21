import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { Article, Section } from 'src/app/services';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { SectionService } from 'src/app/services/section.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'docs-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  article?: Article;
  sections: Section[] = [];
  isLoggedIn = false;

  feedbackVisible = false;
  creatorsVisible = false;

  optionsMenu: MenuItem[] = [
    {
      label: "Save To Collection",
      icon: "pi pi-database",
      command: () => {
        this.userService.addToCollection(this.article!._id)
          .subscribe({
            next: () => {
              this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Saved' });
            },
            error: err => {
              err.error.errors.forEach(
                (error: any) => 
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
            }
          });
      }
    },
    {
      label: "Send a Feedback",
      icon: "pi pi-comment",
      command: () => {
        this.feedbackVisible = true
      }
    },
    {
      label: "View Creators",
      icon: "pi pi-user-edit",
      command: () => {
        this.creatorsVisible = true;
      }
    }
  ]

  nodes: TreeNode[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    // private sectionService: SectionService,
    private authService: AuthService,
    private messageService: MessageService,
    private articleService: ArticleService,
    private userService: UserService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get("id");

      if (id) {
        this.articleService.getOne(id)
          .subscribe({
            next: ({ data }) => {
              this.article = data;
              // TODO fetch sections
              // this.nodes = this.sectionService.getAll(data.toolkit, data.type).map(section => {
              //   return this.sectionService.convertToTree(section);
              // });
            },
            error: err => {
              this.router.navigate(["/not-found"]);
            }
          });
      }
    });
  }

  async copyLink() {
    await navigator.clipboard.writeText(window.location.href);
  }

  sendFeedback(el: HTMLTextAreaElement) {
    if (this.article) {
      this.articleService.sendFeedback(this.article?._id, el.value)
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Feedback sent' });
            this.feedbackVisible = false;
          },
          error: err => {
            err.error.errors.forEach(
              (error: any) => 
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
          }
        });
    }
  }

  liked() {
    const id = localStorage.getItem("id");

    if (id && this.article) {
      const reacted = this.article.reactions.find(reaction => reaction.user == id);

      if (!reacted) return null;

      return reacted.type == 'like';
    }

    return null;
  }

  like() {
    if (this.liked()) {
      this.articleService.unreactToArticle(this.article!._id)
        .subscribe();

      return;
    }

    this.articleService.reactToArticle(this.article!._id, "like")
      .subscribe();
  }

  dislike() {
    if (this.liked() === false) {
      this.articleService.unreactToArticle(this.article!._id)
        .subscribe();

      return;
    }

    this.articleService.reactToArticle(this.article!._id, "dislike")
      .subscribe();
  }
}
