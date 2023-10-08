import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { InputValidationService } from 'src/app/services/input-validation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'docs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loading = false;
  user = {
    name: "",
    password: "",
    phonenumber: "",
    email: ""
  };

  constructor(private userService: UserService,
    private inputValidationService: InputValidationService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router) { }

  register({ form }: NgForm) {
    const error = this.inputValidationService.validate(form);

    if (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
      return;
    }

    this.loading = true;
    this.userService.register(this.user.name, this.user.email, this.user.password, this.user.phonenumber)
      .subscribe({
        next: ({ data }) => {
          this.loading = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register Success' });
          this.authService.setSession(data);
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1500);
        },
        error: err => {
          this.loading = false;
          err.error.errors.forEach(
            (error: any) => 
              this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
        }
      });
  }
}
