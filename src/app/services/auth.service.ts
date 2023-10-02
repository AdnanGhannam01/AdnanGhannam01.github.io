import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApiResponse } from './index';
import * as moment from 'moment';
import { Router } from '@angular/router';

export interface Login {
  token: string;
  privilege: string;
  expiresIn: number;
  id: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get token() {
    return localStorage.getItem("token")
  }

  constructor(private http: HttpClient, private router: Router) { }

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

  setSession(authResult: Login) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem("id", authResult.id);
    localStorage.setItem("privilege", authResult.privilege);
  }

  getSession() {
    this.isLoggedIn();

    return {
      token: localStorage.getItem("token"),
      expires_at: localStorage.getItem("expires_at"),
      id: localStorage.getItem("id"),
      privilege: localStorage.getItem("privilege")
    };
  }

  logout() {
    this.clearLocalStorage();
    this.router.navigate(['/']);
  }

  clearLocalStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("id");
    localStorage.removeItem("privilege");
  }

  public isLoggedIn() {
    const stillLogged = moment().isBefore(this.getExpiration());

    if (!stillLogged) this.clearLocalStorage();

    return stillLogged;
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

  isOwner(id: string) {
    if (this.isLoggedOut()) return false;

    const userId = localStorage.getItem("id");

    if (id != userId) return false;

    return true;
  }
}
