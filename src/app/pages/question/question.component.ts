import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'docs-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  constructor(private activedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activedRoute.paramMap.subscribe(params => {
      const id = params.get("id");
      
      if (id) {
        // this.sectionService.getAll(id, "tutorial")
        //   .subscribe({
        //     next: ({ data }) => {
        //       console.log(data)
        //       this.sections = data;
        //     },
        //     error: err => {
        //       console.error("FETCHING ERROR", err.error);
        //     }
        //   });
      }
    });
  }
}
