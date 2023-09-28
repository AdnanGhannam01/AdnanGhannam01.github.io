import { Component } from '@angular/core';
import { ToolkitService, ToolkitsList } from 'src/app/services/toolkit.service';

@Component({
  selector: 'docs-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  toolkitsList?: ToolkitsList;

  constructor(private toolkitService: ToolkitService) { } 

  ngOnInit() {
    this.toolkitsList = this.toolkitService.getAllGrouped();
  }
}
