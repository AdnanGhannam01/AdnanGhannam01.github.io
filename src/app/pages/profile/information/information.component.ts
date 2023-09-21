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
  editMode = false;
  user?: User;

  constructor(private userService: UserService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.userService.getProfile()
      .subscribe(({ data }) => {
        this.user = data;
      });
  }

  exit(save: boolean) {
    console.log(this.user)
    if (save && this.user) {
      this.userService.updateProfile(this.user.name, this.user.email)
        .subscribe({
          next: () => {
            this.editMode = false;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Information updated' });
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
