import { Component } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MenuItem } from 'primeng/api';

@Component({
  selector: 'docs-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  optionsMenu: MenuItem[] = [
    {
      label: "Delete My Account",
      command: () => this.deleteConfirmation()
    }
  ];

  constructor(private confirmationService: ConfirmationService) {}

  deleteConfirmation() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // TODO
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            // TODO
            break;
          case ConfirmEventType.CANCEL:
            // TODO
            break;
        }
      }
    });
  }
}
