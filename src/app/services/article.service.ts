import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Article } from '.';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getOne(id: string) {
    return this.http.get<ApiResponse<Article>>(`/articles/${id}`);
  }

  sendFeedback(id: string, text: string) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`)

    return this.http.post<any>(`/articles/${id}/send-feedback`,
      { text },
      { headers });
  }
}
