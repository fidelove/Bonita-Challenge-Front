import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { User, RoleType } from '../../model/model';
import { DialogService } from '../../services/dialog.service';
import { environment } from '../../../environments/environment';
import { CommonUserComponent } from '../commonuser/commonuser.component';
import { AdminService } from 'src/app/services/admin.service';

@Component({
	selector: 'app-admin',
	templateUrl: '../commonuser/commonuser.component.html',
	styleUrls: ['../commonuser/commonuser.component.css']
})

export class AdminComponent extends CommonUserComponent<User> implements OnInit {

	constructor(public override service: CommonService, protected dialog: DialogService, private admin: AdminService) {
		super(service, admin);
		this.newElementButton = 'Create new user';
		this.buttonHidden = false;
	}

	ngOnInit(): void {
		this.admin.updateItems();
	}

}