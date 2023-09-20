import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'docs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private userService: UserService,
    private messageService: MessageService,
    private router: Router) { }


  register(name: string, email: string, password: Nullable<string>) {
    this.userService.register(name, email, password)
      .subscribe({
        next: ({ data }) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register Success' });
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1500);
        },
        error: err => {
          console.log(err.error.errors)
          err.error.errors.forEach(
            (error: any) => 
              this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
        }
      });
  }
}
