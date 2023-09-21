import { Component } from '@angular/core';
import { User } from 'src/app/services';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'docs-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent {
  editMode = false;
  user?: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getProfile()
      .subscribe(({ data }) => {
        this.user = data;
      });
  }

  exit(save: boolean) {
    this.editMode = false;
  }
}
