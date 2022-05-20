import { Component, OnInit } from '@angular/core';
import { CommonUserComponent } from '../commonuser/commonuser.component';
import { Recipe, RoleType } from 'src/app/model/model';
import { CommonService } from 'src/app/services/common.service';
import { DialogService } from 'src/app/services/dialog.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: '../commonuser/commonuser.component.html',
  styleUrls: ['../commonuser/commonuser.component.css']
})
export class UserComponent extends CommonUserComponent<Recipe> implements OnInit {

  constructor(public override service: CommonService, protected dialog: DialogService, private user: UserService) {
    super(service, user);
    this.buttonHidden = true;
  }

  ngOnInit(): void {
    this.user.updateItems();
  }
}
