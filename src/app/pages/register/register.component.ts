import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'docs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loading = false;

  constructor(private userService: UserService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router) { }


  register(name: string, email: string, password: Nullable<string>) {
    this.loading = true;
    this.userService.register(name, email, password)
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
