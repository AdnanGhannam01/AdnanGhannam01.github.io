import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Article } from '.';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private http: HttpClient) { }

  getOne(id: string) {
    return this.http.get<ApiResponse<Article>>(`/articles/${id}`);
  }
}
