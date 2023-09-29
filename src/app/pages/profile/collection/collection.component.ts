import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Article, Collection } from 'src/app/services';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'docs-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent {
  loading = true;
  collection?: Collection;

  constructor(private userService: UserService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.userService.getCollection()
      .subscribe(({ data }) => {
        this.loading = false;
        this.collection = data;
      });
  }

  onSearch(table: Table, input: HTMLInputElement) {
    table.filterGlobal(input.value, 'contains');
  }

  remove(id: string) {
    this.userService.removeFromCollection(id)
      .subscribe(() => {
        this.collection!.articles = this.collection!.articles.filter(article => article._id != id);
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Article Deleted From Your Collection' });
      });
  }
}
