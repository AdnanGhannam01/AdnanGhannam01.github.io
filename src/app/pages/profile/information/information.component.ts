import { Component } from '@angular/core';

@Component({
  selector: 'docs-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent {
  editMode = false;
  name = "Adnan Ghannam";
  email = "adnan@gmail.com";

  exit(save: boolean) {
    this.editMode = false;
  }
}
