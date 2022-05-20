import { Injectable } from '@angular/core';
import { CommonUserService } from './commonuser.service';
import { Recipe, RoleType } from '../model/model';
import { environment } from 'src/environments/environment';
import { DialogService } from './dialog.service';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ChefService extends CommonUserService<Recipe>{

  constructor(protected override service: CommonService, protected override dialog: DialogService) {
    super(service, dialog);
   }

  // Methods to be implemented from parent class
   getAllItemsUrl(): string {
    return environment.recipeUrl;
  }

   getResourceUrl(): string {
    return environment.recipeUrl;
  }

   getDeleteUrl(item: Recipe): string {
    return environment.recipeUrl + "/" + item.id;
  }

   getDeleteTitle(item: Recipe): string {
    return 'Delete recipe ' + item.name;
  }

   getDeleteContent(item: Recipe): string {
    return 'Are you sure you want to delete the recipe ' + item.name;
  }

   createNewElement() {
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

   processResponse(response: Recipe[]) {
    response.forEach(recipe => {
      recipe.displayName = recipe.name;
      recipe.contextType = RoleType.CHEF;
    });
  }
}