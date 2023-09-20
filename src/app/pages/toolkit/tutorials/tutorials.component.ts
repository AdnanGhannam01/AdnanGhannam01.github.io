import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Section } from 'src/app/services';
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
  sections: Section[] = [];

  constructor(private activedRoute: ActivatedRoute,
              private sectionService: SectionService) { }

  ngOnInit() {
    this.activedRoute.paramMap.subscribe(params => {
      const id = params.get("id");
      
      if (id) {
        this.sectionService.getAll(id, "tutorial")
          .subscribe({
            next: ({ data }) => {
              this.sections = data;
            },
            error: err => {
              console.error("FETCHING ERROR", err.error);
            }
          });
      }
    });
  }
}
