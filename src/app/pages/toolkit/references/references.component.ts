import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Section } from 'src/app/services';
import { SearchService } from 'src/app/services/search.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'docs-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss']
})
export class ReferencesComponent {
  sections: Section[] = [];
  visibleSections: Section[] = [];

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
              this.sections = data;
              this.visibleSections = this.sections;
            },
            error: err => {
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
}
