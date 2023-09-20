import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Toolkit } from '.';

@Injectable({
  providedIn: 'root'
})
export class ToolkitService {
  constructor(private http: HttpClient) { }

  getOne(id: string) {
    return this.http.get<ApiResponse<Toolkit>>(`/toolkits/${id}`);
  }
}
