import { Component, OnInit } from '@angular/core';
import { CommonUserComponent } from '../commonuser/commonuser.component';
import { Recipe, RoleType } from 'src/app/model/model';
import { CommonService } from 'src/app/services/common.service';
import { DialogService } from 'src/app/services/dialog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: '../commonuser/commonuser.component.html',
  styleUrls: ['../commonuser/commonuser.component.css']
})
export class UserComponent extends CommonUserComponent<Recipe> implements OnInit {

  constructor(public override service: CommonService, protected override dialog: DialogService) {
    super(service, dialog);
    this.buttonHidden = true;
  }

  ngOnInit(): void {
    this.updateItems();
  }

  // Methods to be implemented from parent class
  override getAllItemsUrl(): string {
    return environment.recipesByKeyUrl;
  }

  override getResourceUrl(): string {
    return environment.userUrl;
  }

  getCommentUrl(): string {
    return environment.commentUrl;
  }

  /*
	override getDeleteContent(item: User): string {
		return 'Are you sure you want to delete the user ' + item.name;
	}
*/
  override createNewElement() { }

  override processResponse(response: Recipe[]) {
    response.forEach(recipe => {
      recipe.displayName = recipe.name;
      recipe.behindName = recipe.author.name;
      recipe.contextType = RoleType.USER;
    });
  }
}
