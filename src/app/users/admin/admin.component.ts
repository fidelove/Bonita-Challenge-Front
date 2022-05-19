import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { User, RoleType } from '../../model/model';
import { DialogService } from '../../services/dialog.service';
import { environment } from '../../../environments/environment';
import { CommonUserComponent } from '../commonuser/commonuser.component';

@Component({
	selector: 'app-admin',
	templateUrl: '../commonuser/commonuser.component.html',
	styleUrls: ['../commonuser/commonuser.component.css']
})

export class AdminComponent extends CommonUserComponent<User> implements OnInit {

	constructor(protected override service: CommonService, protected override dialog: DialogService) {
		super(service, dialog);
		this.newElementButton = 'Create new user';
	}

	ngOnInit(): void {
		this.updateItems();
	}

	// Methods to be implemented from parent class
	override getAllItemsUrl(): string {
		return environment.allUsersUrl;
	}

	override getResourceUrl(): string {
		return environment.userUrl;
	}

	override getDeleteUrl(item: User): string {
		return environment.userUrl + "/" + item.id;
	}


	override getDeleteTitle(item: User): string {
		return 'Delete user ' + item.name;
	}

	override getDeleteContent(item: User): string {
		return 'Are you sure you want to delete the user ' + item.name;
	}

	override createNewElement() {
		const user: User = {
			id: 0,
			name: '',
			userPassword: '',
			userEmail: '',
			role: RoleType.ADMIN
		}
		this.dialog.openItemCreateOrEdit<User>(true, user);
	}
}