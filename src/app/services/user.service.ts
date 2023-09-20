import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '.';
import { Nullable } from 'primeng/ts-helpers';

export interface User {
  _id: string;
  name: string;
  email: string;
  privilege: string;
  userCollection: string;
  joinedAt: number,
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  register(name: string, email: string, password: Nullable<string>) {
    return this.http.post<ApiResponse<User>>("/register", { name, email, password })
  }
}
