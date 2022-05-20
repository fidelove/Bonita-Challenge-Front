import { Injectable } from '@angular/core';
import { CommonUserService } from './commonuser.service';
import { User, RoleType } from '../model/model';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends CommonUserService<User> {

  constructor(protected override service: CommonService, protected override dialog: DialogService) {
    super(service, dialog);
  }

  onSaveUser(item: any, action: string) {
    this.onSave(item, action, this.getResourceUrl());
  }

  getAllItemsUrl(): string {
    return environment.allUsersUrl;
  }

  getResourceUrl(): string {
    return environment.userUrl;
  }

  getDeleteUrl(item: User): string {
    return environment.userUrl + "/" + item.id;
  }

  getDeleteTitle(item: User): string {
    return 'Delete user ' + item.name;
  }

  getDeleteContent(item: User): string {
    return 'Are you sure you want to delete the user ' + item.name;
  }

  createNewElement() {
    const user: User = {
      id: 0,
      name: '',
      userPassword: '',
      userEmail: '',
      role: RoleType.ADMIN,
      contextType: RoleType.ADMIN
    }
    this.dialog.openItemCreateOrEdit<User>(true, user);
  }

  processResponse(response: User[]) {
    response.forEach(user => {
      user.displayName = user.name;
      user.behindName = user.userEmail;
      user.contextType = RoleType.ADMIN;
    });
  }
}
