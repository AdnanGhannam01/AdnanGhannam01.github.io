import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Toolkit } from '.';

export interface ToolkitItem {
  label: string;
  value: Toolkit[];
}

export interface ToolkitsList {
  lang: ToolkitItem;
  lib: ToolkitItem;
  frame: ToolkitItem;
}

@Injectable({
  providedIn: 'root'
})
export class ToolkitService {
  constructor(private http: HttpClient) { }

  getAll(include = false) {
    return this.http.get<ApiResponse<Toolkit[]>>(`/toolkits?include=${include}`);
  }

  getAllGrouped() {
    let toolkitsList: ToolkitsList = {
      lang: {
        label: "Languages",
        value: []
      },
      lib: {
        label: "Libraries",
        value: []
      },
      frame: {
        label: "Frameworks",
        value: []
      }
    };

    this.getAll(true)
      .subscribe(({ data }) => {
        data.forEach(toolkit => {
          switch(toolkit.type) {
            case "language":
              toolkitsList.lang.value.push(toolkit);
              break;
            case "library":
              toolkitsList.lib.value.push(toolkit);
              break;
            case "framework":
              toolkitsList.frame.value.push(toolkit);
              break;
          }
        });
      });

    return toolkitsList;
  }

  getOne(id: string) {
    return this.http.get<ApiResponse<Toolkit>>(`/toolkits/${id}`);
  }
}
