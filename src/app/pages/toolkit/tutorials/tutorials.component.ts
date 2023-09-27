import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Section } from 'src/app/services';
import { SearchService } from 'src/app/services/search.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'docs-tutorials',
  host: {
    "class": "docs-with-sidebar"
  },
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss']
})
export class TutorialsComponent {
  loading = true;

  sections: Section[] = [];
  visibleSections: Section[] = [];

  constructor(private activedRoute: ActivatedRoute,
              private router: Router,
              private sectionService: SectionService,
              private searchService: SearchService) { }

  ngOnInit() {
    this.activedRoute.paramMap.subscribe(params => {
      const id = params.get("id");
      
      if (id) {
        this.sectionService.getAll(id, "tutorial")
          .subscribe({
            next: ({ data }) => {
              this.loading = false;
              this.sections = data;
              this.visibleSections = this.sections;
            },
            error: err => {
              this.loading = false;
              console.error("FETCHING ERROR", err.error);
            }
          });
      }
    });

    this.searchService.valueChange.subscribe(val => {
      this.visibleSections = this.sections.map(section => {
        return {
          ...section,
          articles: section.articles.filter(article => article.title.toLowerCase().includes(val.toLowerCase()))
        }
      }).filter(section => section.articles.length != 0);
    });
  }

  navigateToFragment(fragment: string): void {
    this.router.navigate([], { fragment: fragment });
  }
}
