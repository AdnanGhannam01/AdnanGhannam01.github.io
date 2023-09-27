import { Component } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: '[docs-toolkit-search]',
  templateUrl: './toolkit-search.component.html',
  styleUrls: ['./toolkit-search.component.scss']
})
export class ToolkitSearchComponent {
  get value() {
    return this.searchService.value;
  }
  set value(val: string) {
    this.searchService.value = val;
  }

  constructor(private searchService: SearchService) { }
}
