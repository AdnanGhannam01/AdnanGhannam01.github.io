import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Section, Toolkit } from '.';
import { TreeNode } from 'primeng/api';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  constructor(private http: HttpClient) { }

  getAll(toolkitId: string, type: string) {
    return this.http.get<ApiResponse<Section[]>>(`/sections/${toolkitId}?type=${type}`);
  }

  convertToTree(section: Section): TreeNode {
    return {
      key: section._id,
      label: section.title,
      children: section.articles.map(article => {
        return {
          key: article._id,
          label: article.title,
          data: '/articles/' + article._id,
          type: "url"
        }
      })
    }
  }
}
