import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/services';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'docs-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent {
  loading = true;
  editMode = false;
  user?: User;
  sending = false;

  constructor(private userService: UserService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.userService.getProfile()
      .subscribe(({ data }) => {
        this.loading = false;
        this.user = data;
      });
  }

  exit(save: boolean) {
    if (!save) {
      this.editMode = false;
    }

    if (save && this.user) {
      this.sending = true;
      this.userService.updateProfile(this.user.name, this.user.email, this.user.phonenumber)
        .subscribe({
          next: () => {
            console.log(123)
            this.sending = false;
            this.editMode = false;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Information updated' });
          },
          error: err => {
            this.sending = false;
            err.error.errors.forEach(
              (error: any) => 
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
          }
        });
    }
  }
}
