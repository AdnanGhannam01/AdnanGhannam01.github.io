import { Injectable } from '@angular/core';
import hljs from 'highlight.js';

@Injectable({
  providedIn: 'root'
})
export class HighlightService {
  constructor() { }

  apply() {
    setTimeout(() => {
      const preTags = document.querySelectorAll(".editor-block pre");
      preTags.forEach(pre => {
        hljs.highlightElement(pre as HTMLElement);
      });
    }, 0);
  }
}
