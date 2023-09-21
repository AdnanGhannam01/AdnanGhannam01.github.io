import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'docs-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  constructor(private userService: UserService,
              private messageService: MessageService) { }

  change(password: Nullable<string>, newPassword: Nullable<string>) {
    if (password && newPassword) {
      this.userService.changePassword(password, newPassword)
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password updated' });
          },
          error: err => {
            err.error.errors.forEach(
              (error: any) => 
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
          }
        });
    }
  }
}
