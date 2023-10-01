import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answer, ApiResponse, Question } from '.';
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

  getAll(toolkitId: string) {
    return this.http.get<ApiResponse<Question[]>>("/questions/toolkits/" + toolkitId);
  }

  getOne(id: string) {
    return this.http.get<ApiResponse<Question>>("/questions/" + id);
  }

  update(id: string, title?: string, content?: string) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`)
    return this.http.put<any>("/questions/" + id, { title, content }, { headers });
  }

  remove(id: string) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`)
    return this.http.delete<any>("/questions/" + id, { headers });
  }

  sendAnswer(id: string, content: string) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`)
    return this.http.post<any>('/questions/answer/' + id, { content }, { headers });
  }

  updateAnswer(id: string, content: string) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`);
    return this.http.put<any>('/answers/' + id, { content }, { headers });
  }

  removeAnswer(id: string) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`);
    return this.http.delete<any>('/answers/' + id, { headers });
  }

  vote(item: Question | Answer, up: boolean) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`);
    const base = 'answers' in item ? 'questions': 'answers';
    return this.http.post<any>(`/${base}/vote/${item._id}?vote=${up ? "up" : "down"}`, {}, { headers });
  }

  unvote(item: Question | Answer) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`);
    const base = 'answers' in item ? 'questions': 'answers';
    return this.http.delete<any>(`/${base}/vote/${item._id}`, { headers });
  }
}
