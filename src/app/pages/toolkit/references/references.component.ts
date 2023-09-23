import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Section } from 'src/app/services';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'docs-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss']
})
export class ReferencesComponent {
  sections: Section[] = [];

  constructor(private activedRoute: ActivatedRoute,
              private sectionService: SectionService) { }

  ngOnInit() {
    this.activedRoute.parent?.paramMap.subscribe(params => {
      const id = params.get("id");
      
      if (id) {
        this.sectionService.getAll(id, "reference")
          .subscribe({
            next: ({ data }) => {
              this.sections = data;
              console.log(data)
            },
            error: err => {
              console.error("FETCHING ERROR", err.error);
            }
          });
      }
    });
  }
}
