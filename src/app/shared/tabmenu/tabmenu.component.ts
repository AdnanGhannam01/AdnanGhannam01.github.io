import { Component, Input } from '@angular/core';

export interface TabMenuItem {
  label: string;
  icon?: string;
  url?: string;
};

@Component({
  selector: 'docs-tabmenu',
  templateUrl: './tabmenu.component.html',
  styleUrls: ['./tabmenu.component.scss']
})
export class TabmenuComponent {
  @Input() items: TabMenuItem[] = [];
}
