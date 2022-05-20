import { Component, OnInit } from '@angular/core';
import { Recipe, RoleType } from 'src/app/model/model';
import { CommonUserComponent } from '../commonuser/commonuser.component';
import { DialogService } from 'src/app/services/dialog.service';
import { CommonService } from 'src/app/services/common.service';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-chef',
	templateUrl: '../commonuser/commonuser.component.html',
	styleUrls: ['../commonuser/commonuser.component.css']
})
export class ChefComponent extends CommonUserComponent<Recipe> implements OnInit {

	constructor(public override service: CommonService, protected override dialog: DialogService) {
		super(service, dialog);
		this.newElementButton = 'Create new recipe';
		this.buttonHidden = false;
	}

	ngOnInit(): void {
		this.updateItems();
	}
	// Methods to be implemented from parent class
	override getAllItemsUrl(): string {
		return environment.recipeUrl;
	}

	override getResourceUrl(): string {
		return environment.recipeUrl;
	}

	override getDeleteUrl(item: Recipe): string {
		return environment.recipeUrl + "/" + item.id;
	}


	override getDeleteTitle(item: Recipe): string {
		return 'Delete recipe ' + item.name;
	}

	override getDeleteContent(item: Recipe): string {
		return 'Are you sure you want to delete the recipe ' + item.name;
	}

	override createNewElement() {
		const recipe: Recipe = {
			id: 0,
			name: '',
			ingredients: [],
			keywords: [],
			author: null,
			comments: [],
			contextType: RoleType.CHEF
		}
		this.dialog.openItemCreateOrEdit<Recipe>(true, recipe);
	}

	override processResponse(response: Recipe[]) {
		response.forEach(recipe => {
			recipe.displayName = recipe.name;
			recipe.contextType = RoleType.CHEF;
		});
	}
}
