import { Component } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'docs-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent {
  onSearch(table: Table, input: HTMLInputElement) {
    table.filterGlobal(input.value, 'contains');
  }
}
