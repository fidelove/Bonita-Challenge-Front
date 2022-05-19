import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/model/model';
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

	constructor(protected override service: CommonService, protected override dialog: DialogService) {
		super(service, dialog);
		this.newElementButton = 'Create new recipe';
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
			comments: []
		}
		this.dialog.openItemCreateOrEdit<Recipe>(true, recipe);

	}
}
