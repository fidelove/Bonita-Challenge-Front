import { Component, OnInit } from '@angular/core';
import { Recipe, RoleType } from 'src/app/model/model';
import { CommonUserComponent } from '../commonuser/commonuser.component';
import { DialogService } from 'src/app/services/dialog.service';
import { CommonService } from 'src/app/services/common.service';
import { environment } from '../../../environments/environment';
import { ChefService } from 'src/app/services/chef.service';

@Component({
	selector: 'app-chef',
	templateUrl: '../commonuser/commonuser.component.html',
	styleUrls: ['../commonuser/commonuser.component.css']
})
export class ChefComponent extends CommonUserComponent<Recipe> implements OnInit {

	constructor(public override service: CommonService, protected dialog: DialogService, private chef: ChefService) {
		super(service, chef);
		this.newElementButton = 'Create new recipe';
		this.buttonHidden = false;
	}

	ngOnInit(): void {
		this.chef.updateItems();
	}
}