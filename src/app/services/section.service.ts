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
    return this.http.get<ApiResponse<Section[]>>(`/toolkits/section/${toolkitId}?type=${type}`);
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

  search(val: string, sections: Section[]) {
    return sections.map(section => {
      return {
        ...section,
        articles: section.articles.filter(article => article.title.toLowerCase().includes(val.toLowerCase()))
      }
    }).filter(section => section.articles.length != 0);
  }
}
