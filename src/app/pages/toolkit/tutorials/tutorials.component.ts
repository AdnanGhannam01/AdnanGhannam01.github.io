import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
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

  messages: Message[] = [];

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
              if (!this.sections.length) {
                this.messages = [{ severity: 'info', detail: 'There is no tutorials in this toolkit yet!' }];
              }
              this.displaySections("");
            }
          });
      }
    });

    this.searchService.valueChange.subscribe(val => {
      this.displaySections(val);
    });
  }

  displaySections(val: string) {
    this.visibleSections = this.sectionService.search(val, this.sections);

    if (!this.visibleSections.length) {
      this.messages = [{ severity: 'info', detail: 'No articles' }];
    } else {
      this.messages = [];
    }
  }

  navigateToFragment(fragment: string): void {
    this.router.navigate([], { fragment: fragment });
  }
}
