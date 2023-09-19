import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

interface Toolkits {
  lang: string;
  lib: string;
  frame: string;
}

@Component({
  selector: 'docs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  sidebarVisible = false;
  visible = false;

  toolkits: Toolkits = {
    lang: "Languages",
    lib: "Libraries",
    frame: "Frameworks"
  }

  selectedToolkit?: string;

  userMenuItems: MenuItem[] = [
    {
      label: "View My Profile",
      icon: "pi pi-user",
      url: "/user",
    },
    {
      label: "View Collection",
      icon: "pi pi-bookmark",
      url: "/collection",
    },
    {
      separator: true
    },
    {
      label: "Logout", 
      icon: "pi pi-sign-out",
      command: () => { }
    }
  ];

  isLoggedIn: boolean;

  constructor(private authService: AuthService) {
    this.isLoggedIn = authService.isLoggedIn();
  }

  showDialog(toolkit: keyof Toolkits) {
    this.selectedToolkit = this.toolkits[toolkit];
    this.visible = true;
  }
}
