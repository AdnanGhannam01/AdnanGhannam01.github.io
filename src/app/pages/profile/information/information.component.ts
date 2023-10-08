import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/services';
import { InputValidationService } from 'src/app/services/input-validation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'docs-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent {
  loading = true;
  user?: User;
  sending = false;

  data?: User;

  #editMode = false;
  get editMode() { return this.#editMode }
  set editMode(val: boolean) {
    this.#editMode = val;
    if (val) this.data = this.user;
  }

  constructor(private userService: UserService,
              private inputValidationService: InputValidationService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.userService.getProfile()
      .subscribe(({ data }) => {
        this.loading = false;
        this.user = data;
      });
  }

  onSubmit({ form }: NgForm) {
    if (!this.data) { return }

    const error = this.inputValidationService.validate(form);

    if (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
      return;
    }

    this.sending = true;
    this.userService.updateProfile(this.data.name, this.data.email, this.data.phonenumber)
      .subscribe({
        next: () => {
          this.sending = false;
          this.editMode = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Information updated' });
          this.user = this.data;
        },
        error: err => {
          this.sending = false;
          err.error.errors.forEach(
            (error: any) => 
              this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
        }
      });
  }

  exit(save: boolean) {
    if (!save) {
      this.editMode = false;
    }

    // console.log(form.controls["name"].errors?.["required"])
    if (save && this.user) {
      this.sending = true;
      this.userService.updateProfile(this.user.name, this.user.email, this.user.phonenumber)
        .subscribe({
          next: () => {
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
