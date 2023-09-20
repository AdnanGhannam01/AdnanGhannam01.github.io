import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApiResponse } from './index';
import * as moment from 'moment';

export interface Login {
  token: string;
  privilege: string;
  expiresIn: number;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(name: string, password: string, 
      next?: ((value: ApiResponse<Login>) => void), 
      error?: ((err: any) => void)) {
    return this.http.post<ApiResponse<Login>>('/login', { name, password })
      .subscribe({
        next: (res) => {
          this.setSession(res.data);
          next?.(res);
        },
        error
      });
  }

  private setSession(authResult: Login) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");

    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }

    return null;
  }    
}
