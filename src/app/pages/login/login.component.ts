import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import { AuthService } from 'src/app/services/auth.service';
import { InputValidationService } from 'src/app/services/input-validation.service';

@Component({
  selector: 'docs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  name = "";
  password = "";
  loading = false;

  constructor(private authService: AuthService,
    private inputValidationService: InputValidationService,
    private messageService: MessageService,
    private router: Router) { }

  login({ form }: NgForm) {
    const error = this.inputValidationService.validate(form);

    if (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
      return;
    }

    this.loading = true;
    this.authService.login(this.name, this.password, (res) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Success' });
      this.loading = false;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1500);
    }, (err) => {
      this.loading = false;
      err.error.errors.forEach(
        (error: any) => 
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
    });
  }
}
