import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Section } from '.';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  constructor(private http: HttpClient) { }

  getAll(toolkitId: string, type: "tutorial" | "reference") {
    return this.http.get<ApiResponse<Section[]>>(`/sections/${toolkitId}?type=${type}`);
  }
}
