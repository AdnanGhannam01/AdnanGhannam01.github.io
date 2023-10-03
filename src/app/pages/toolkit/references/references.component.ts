import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/api';
import { Section } from 'src/app/services';
import { SearchService } from 'src/app/services/search.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'docs-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss']
})
export class ReferencesComponent {
  loading = true;

  sections: Section[] = [];
  visibleSections: Section[] = [];

  messages: Message[] = [];

  constructor(private activedRoute: ActivatedRoute,
              private sectionService: SectionService,
              private searchService: SearchService) { }

  ngOnInit() {
    this.activedRoute.parent?.paramMap.subscribe(params => {
      const id = params.get("id");
      
      if (id) {
        this.sectionService.getAll(id, "reference")
          .subscribe({
            next: ({ data }) => {
              this.loading = false;
              this.sections = data;
              this.displaySections("");
            },
            error: err => {
              this.loading = false;
              console.error("FETCHING ERROR", err.error);
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

}
