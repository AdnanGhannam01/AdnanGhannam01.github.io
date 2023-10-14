import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Section, Toolkit } from 'src/app/services';
import { AuthService } from 'src/app/services/auth.service';
import { ToolkitItem, ToolkitService, ToolkitsList } from 'src/app/services/toolkit.service';

@Component({
  selector: 'docs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  sidebarVisible = false;
  visible = false;

  selectedList?: ToolkitItem;
  toolkitsList?: ToolkitsList;
  selectedToolkitId = "";
  selectedTutorials: Section[] = [];
  selectedReferences: Section[] = [];
  loading = true;

  userMenuItems: MenuItem[] = [
    {
      label: "View My Profile",
      icon: "pi pi-user",
      routerLink: "/profile",
    },
    {
      label: "View Collection",
      icon: "pi pi-bookmark",
      routerLink: "/profile/collection",
    },
    {
      label: "Change Password",
      icon: "pi pi-key",
      routerLink: "/profile/change-password",
    },
    {
      label: "View My Questions",
      icon: "pi pi-question-circle",
      routerLink: "/profile/my-questions",
    },
    {
      separator: true
    },
    {
      label: "Logout", 
      icon: "pi pi-sign-out",
      command: () => { this.authService.logout(); location.reload() },
   }
  ];

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService,
              private toolkitService: ToolkitService) { } 

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.toolkitsList = this.toolkitService.getAllGrouped();
  }

  showDialog(toolkit: keyof ToolkitsList) {
    if (this.toolkitsList)  {
      this.selectedList = this.toolkitsList[toolkit];
      this.changeSelected(this.selectedList.value.at(0));
      this.visible = true;
    }
  }

  changeSelected(toolkit?: Toolkit) {
    if (toolkit) {
      this.selectedToolkitId = toolkit._id;
      this.selectedTutorials = toolkit.sections.filter(section => section.type == 'tutorial');
      this.selectedReferences = toolkit.sections.filter(section => section.type == 'reference');
    }
  }
}
