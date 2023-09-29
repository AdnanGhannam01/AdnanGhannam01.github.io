import { Component } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private confirmationService: ConfirmationService,
              private userService: UserService,
              private authService: AuthService,
              private messageService: MessageService) {}

  deleteConfirmation() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.removeAccount()
          .subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account Deleted' });
              setTimeout(() => {
                this.authService.logout();
                location.href = "/";
              }, 1500);
            },
            error: err => {
              err.error.errors.forEach(
                (error: any) => 
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
            }
          })
      },
      reject: (type: ConfirmEventType) => { }
    });
  }
}
