import { Component, Input } from '@angular/core';

@Component({
  selector: '[docs-list-item]',
  host: {
    "[class]": "'docs-with-border ' + dir",
    "[style]": "{ 'text-align': dir }"
  },
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() dir: "left" | "right" | "top" | "bottom" = "left";
}
