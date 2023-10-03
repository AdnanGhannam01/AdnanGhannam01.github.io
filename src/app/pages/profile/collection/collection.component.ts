import { Component } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { catchError, throwError } from 'rxjs';
import { Article, Collection } from 'src/app/services';
import { NavigatorService } from 'src/app/services/navigator.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'docs-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent {
  loading = true;
  #collection?: Collection;
  get collection(): Collection | undefined { return this.#collection }
  set collection(val: Collection) {
    this.#collection = val;
    if (!val.articles.length) {
      this.messages = [{ severity: 'info', detail: 'You have no articles in your collection' }];
    }
  }

  messages: Message[] = [];

  constructor(private userService: UserService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.userService.getCollection()
      .pipe(catchError(() => {
        const message = "Something went wrong, please try again later.";
        this.messages = [{ severity: 'error', detail: message }];
        this.loading = false;
        return throwError(message);
      }))
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
