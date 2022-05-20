import { Injectable } from '@angular/core';
import { CommonUserService } from './commonuser.service';
import { Recipe, RoleType } from '../model/model';
import { environment } from 'src/environments/environment';
import { Comment } from '../model/model';
import { DialogService } from './dialog.service';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CommonUserService<Recipe>{

  constructor(protected override service: CommonService, protected override dialog: DialogService) {
    super(service, dialog);
  }

  onCreateComment(data: Recipe, comment: string): void {

    if (RoleType.USER == data.contextType) {
      const newComment: Comment = {
        comment: comment,
        id: 0,
        name: comment,
        contextType: RoleType.USER
      };

      var url = this.getCommentUrl().replace('{0}', data.id.toString());

      this.service.post<Comment>(url, newComment).subscribe(
        (response) => {
          response.contextType = RoleType.USER;
          response.displayName = newComment.comment;
          this.createComment(response);
        },
        (error => {
          this.service.handleError(error);
        })
      );
    }
  }

  // Comment created succesfully
  createComment(comment: Comment) {
    this.dialog.openSuccessDialog(comment, 'created');
  }


  // Methods to be implemented from parent class
  getAllItemsUrl(): string {
    return environment.recipesByKeyUrl;
  }

  getResourceUrl(): string {
    return environment.userUrl;
  }

  getCommentUrl(): string {
    return environment.commentUrl;
  }

  processResponse(response: Recipe[]) {
    response.forEach(recipe => {
      recipe.displayName = recipe.name;
      recipe.behindName = recipe.author.name;
      recipe.contextType = RoleType.USER;
    });
  }

  // Non implemented methods
  getDeleteTitle(item: Recipe): string {
    return '';
  }
  getDeleteContent(item: Recipe): string {
    return '';
  }

  getDeleteUrl(item: Recipe) {}

  createNewElement() {}
}
