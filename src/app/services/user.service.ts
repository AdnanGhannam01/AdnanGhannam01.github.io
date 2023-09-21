import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Collection, User } from '.';
import { Nullable } from 'primeng/ts-helpers';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,
              private authService: AuthService) { }

  register(name: string, email: string, password: Nullable<string>) {
    return this.http.post<ApiResponse<User>>("/register", { name, email, password })
  }

  getProfile() {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`)
    return this.http.get<ApiResponse<User>>("/user", { headers });
  }

  getCollection() {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`)
    return this.http.get<ApiResponse<Collection>>("/collection", { headers });
  }

  addToCollection(id: string) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`)
    return this.http.post<any>(`/collection/${id}`, {}, { headers });
  }

  removeFromCollection(id: string) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`)
    return this.http.delete<any>(`/collection/${id}`, { headers });
  }
}
