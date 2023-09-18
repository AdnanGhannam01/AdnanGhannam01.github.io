import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabMenuItem } from 'src/app/shared/tabmenu/tabmenu.component';

@Component({
  selector: 'docs-toolkit',
  templateUrl: './toolkit.component.html',
  styleUrls: ['./toolkit.component.scss']
})
export class ToolkitComponent implements OnInit {
  tabMenuItems: TabMenuItem[] = [
    { label: "Toturial", url: "./", icon: "pi pi-book" },
    { label: "References", url: "./references", icon: "pi pi-align-left" },
    { label: "Questions", url: "./questions", icon: "pi pi-question" },
    { label: "PlayGround", url: "./compiler", icon: "pi pi-cog" }
  ];

  constructor(private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activedRoute.paramMap.subscribe(params => {
      const id = params.get("id");
      
      // TODO fetch by id
    });
  }
}
