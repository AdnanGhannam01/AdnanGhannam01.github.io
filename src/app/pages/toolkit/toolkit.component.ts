import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toolkit } from 'src/app/services';
import { ToolkitService } from 'src/app/services/toolkit.service';
import { TabMenuItem } from 'src/app/shared/tabmenu/tabmenu.component';

@Component({
  selector: 'docs-toolkit',
  templateUrl: './toolkit.component.html',
  styleUrls: ['./toolkit.component.scss']
})
export class ToolkitComponent implements OnInit {
  toolkit?: Toolkit;
  
  tabMenuItems: TabMenuItem[] = [
    { label: "Toturial", url: "./", icon: "pi pi-book" },
    { label: "References", url: "./references", icon: "pi pi-align-left" },
    { label: "Questions", url: "./questions", icon: "pi pi-question" },
    { label: "PlayGround", url: "./compiler", icon: "pi pi-cog" }
  ];

  constructor(private activedRoute: ActivatedRoute,
              private messageService: MessageService,
              private toolkitService: ToolkitService) { }

  ngOnInit() {
    this.activedRoute.paramMap.subscribe(params => {
      const id = params.get("id");
      
      if (id) {
        this.toolkitService.getOne(id)
          .subscribe({
            next: ({ data }) => {
              this.toolkit = data;
            },
            error: err => {
              console.error("FETCHING ERROR", err.error);
            }
          })
      }
    });
  }
}
