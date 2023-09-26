import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Question } from '.';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  create(toolkitId: string, title: string, content: string) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`)

    return this.http.post<ApiResponse<Question>>("/questions/toolkits/" + toolkitId, { title, content }, { headers });
  }
}
