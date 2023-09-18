import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'docs-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title = "";
  @Input() flex = false;

  @HostBinding("title") get getTitle() { return "" }
}
