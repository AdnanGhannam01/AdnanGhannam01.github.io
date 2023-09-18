import { Component } from '@angular/core';
import { Nullable } from 'primeng/ts-helpers';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'docs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService) { }

  login(name: string, password: Nullable<string>) {
    if (name && password) {
      this.authService.login(name, password);
    }
  }
}
