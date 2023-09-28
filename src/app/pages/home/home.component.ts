import { Component } from '@angular/core';
import { Toolkit } from 'src/app/services';
import { ToolkitService } from 'src/app/services/toolkit.service';

@Component({
  selector: 'docs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  toolkits: Toolkit[] = [];

  constructor(private toolkitService: ToolkitService) { }

  ngOnInit() {
    this.toolkitService.getAll()
      .subscribe(({ data }) => {
        this.toolkits = data;
      });
  }
}
