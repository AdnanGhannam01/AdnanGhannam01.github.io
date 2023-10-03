import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Collection, Question, User } from '.';
import { Nullable } from 'primeng/ts-helpers';
import { AuthService, Login } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,
              private authService: AuthService) { }

  register(name: string, email: string, password: Nullable<string>) {
    return this.http.post<ApiResponse<Login>>("/register", { name, email, password })
  }

  getProfile() {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`)
    return this.http.get<ApiResponse<User>>("/user", { headers });
  }

  getMyQuestions() {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`)
    return this.http.get<ApiResponse<Question[]>>("/user/my-questions", { headers });
  }

  updateProfile(name: string, email: string, phonenumber: string) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`)
    return this.http.put<any>("/user", { name, email, phonenumber }, { headers });
  }

  removeAccount() {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`)
    return this.http.delete<any>("/user", { headers });
  }

  changePassword(password: string, newPassword: string) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`)
    return this.http.put<any>("/user/change-password", { password, newPassword }, { headers });
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
