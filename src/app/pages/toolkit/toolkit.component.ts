import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
  loading = true;
  toolkit?: Toolkit;
  
  tabMenuItems: TabMenuItem[] = [
    { label: "Toturial", url: "./", icon: "pi pi-book" },
    { label: "References", url: "./references", icon: "pi pi-align-left" },
    { label: "Questions", url: "./questions", icon: "pi pi-question" },
    { label: "Online Compiler", url: "./compiler", icon: "pi pi-cog", disabled: true }
  ];

  constructor(private activedRoute: ActivatedRoute,
              private router: Router,
              private titleService: Title,
              private toolkitService: ToolkitService) { }

  ngOnInit() {
    this.activedRoute.paramMap.subscribe(params => {
      const id = params.get("id");
      
      if (!id) return;

      this.toolkitService.getOne(id)
        .subscribe({
          next: ({ data }) => {
            this.loading = false;
            this.toolkit = data;
            this.titleService.setTitle("TechStack - " + data.name);
          },
          error: err => {
            this.loading = false;
            this.router.navigate(['not-found']);
          }
        })
    });
  }
}
