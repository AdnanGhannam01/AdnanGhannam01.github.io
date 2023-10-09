import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { Article, Section } from 'src/app/services';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { HighlightService } from 'src/app/services/highlight.service';
import { SectionService } from 'src/app/services/section.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'docs-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  liked: boolean | null = null;
  loading = true;

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
  ];

  breadcrumbItems: MenuItem[] | undefined;
  home: MenuItem | undefined;

  nodes: TreeNode[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private sectionService: SectionService,
    private authService: AuthService,
    private messageService: MessageService,
    private articleService: ArticleService,
    private titleService: Title,
    private highlightService: HighlightService,
    private userService: UserService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get("id");

      if (!id) return;

      this.articleService.getOne(id)
        .subscribe({
          next: ({ data }) => {
            this.article = data;
            this.titleService.setTitle("TechStack - " + data.title);
            const userId = this.authService.getSession().id;
            const reaction = data.reactions.find(item => item.user == userId);

            if (reaction) this.liked = reaction.type == "like" ? true : false;

            this.home = { icon: 'pi pi-home', routerLink: '/' };
            this.breadcrumbItems = [
              {
                label: this.article.toolkit.name, 
                url: `/toolkits/${this.article.toolkit._id}` 
              },
              { 
                label: this.article.section.title, 
                url: `/toolkits/${this.article.toolkit._id}#${this.article.section._id}` 
              },
              { label: this.article.title }
            ];

            this.highlightService.apply();

            this.sectionService.getAll(data.toolkit._id, data.type)
              .subscribe(({ data }) => {
                this.nodes = data.map(section => {
                  return this.sectionService.convertToTree(section);
                });
                this.loading = false;
              });
          },
          error: err => {
            this.router.navigate(["/not-found"]);
          }
        });
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

  toggle(option: boolean) {
    this.liked = this.liked === option ? null : option;

    if (this.article) {
      if (this.liked === null) {
        this.articleService.unreactToArticle(this.article._id)
          .subscribe(() => console.info("Unreacted"));
        return;
      }

      this.articleService.reactToArticle(this.article._id, this.liked)
        .subscribe(() => console.info("Reacted"));
    }
  }
}
