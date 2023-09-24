import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Answer } from 'src/app/services';

@Component({
  selector: 'docs-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  sortOptions: SelectItem[] = [];

  sortOrder: number = 1;

  sortField: string = "";

  answers: Answer[] = [
    {
      _id: "",
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni ducimus unde veniam qui sint perferendis ab, doloremque tempore cupiditate ex? Reiciendis maxime laborum dolorum quae dolorem tempore labore eos aliquam voluptas, aspernatur, dicta officia numquam quis perspiciatis neque sed? A, quo consequuntur. Id molestias, nam nisi libero maiores commodi nulla? Excepturi ea sapiente enim vero tempore necessitatibus. Iure, labore veritatis! Consequuntur quas voluptatum reprehenderit excepturi quae, labore cumque. Explicabo eius possimus nisi ea blanditiis illo illum, cum vitae? Earum maxime possimus sed totam corporis cum error. Laboriosam, a minus! Aliquam mollitia voluptatibus reprehenderit repellat consequatur, enim commodi ratione cumque tempore!",
      createdAt: Date.now(),
      lastModifyAt: Date.now(),
      votes: 5 
    },
    {
      _id: "",
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni ducimus unde veniam qui sint perferendis ab, doloremque tempore cupiditate ex? Reiciendis maxime laborum dolorum quae dolorem tempore labore eos aliquam voluptas, aspernatur, dicta officia numquam quis perspiciatis neque sed? A, quo consequuntur. Id molestias, nam nisi libero maiores commodi nulla? Excepturi ea sapiente enim vero tempore necessitatibus. Iure, labore veritatis! Consequuntur quas voluptatum reprehenderit excepturi quae, labore cumque. Explicabo eius possimus nisi ea blanditiis illo illum, cum vitae? Earum maxime possimus sed totam corporis cum error. Laboriosam, a minus! Aliquam mollitia voluptatibus reprehenderit repellat consequatur, enim commodi ratione cumque tempore!",
      createdAt: Date.now(),
      lastModifyAt: Date.now(),
      votes: 10 
    },
    {
      _id: "",
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni ducimus unde veniam qui sint perferendis ab, doloremque tempore cupiditate ex? Reiciendis maxime laborum dolorum quae dolorem tempore labore eos aliquam voluptas, aspernatur, dicta officia numquam quis perspiciatis neque sed? A, quo consequuntur. Id molestias, nam nisi libero maiores commodi nulla? Excepturi ea sapiente enim vero tempore necessitatibus. Iure, labore veritatis! Consequuntur quas voluptatum reprehenderit excepturi quae, labore cumque. Explicabo eius possimus nisi ea blanditiis illo illum, cum vitae? Earum maxime possimus sed totam corporis cum error. Laboriosam, a minus! Aliquam mollitia voluptatibus reprehenderit repellat consequatur, enim commodi ratione cumque tempore!",
      createdAt: Date.now(),
      lastModifyAt: Date.now(),
      votes: 2 
    },
  ];

  constructor(private activedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.sortOptions = [
      { label: 'Votes High to Low', value: '!votes' },
      { label: 'Votes Low to High', value: 'votes' }
    ];

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

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
