import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(name: string, password: string) {
    return this.http.post<any>('/login', { name, password })
            .subscribe(this.setSession);
  }

  private setSession(authResult: any) {
      const expiresAt = moment().add(authResult.expiresIn,'second');

      localStorage.setItem('token', authResult.idToken);
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
