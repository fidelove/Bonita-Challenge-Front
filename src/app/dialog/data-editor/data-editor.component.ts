import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {  Ingredient, Keyword, Recipe} from 'src/app/model/model';
import { ChefService } from 'src/app/services/chef.service';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-data-editor',
  templateUrl: './data-editor.component.html',
  styleUrls: ['./data-editor.component.css']
})
export class DataEditorComponent implements OnInit {

  hidePassword = true;
  addOnBlur = true;
  comment = '';
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: CommonService, private admin: AdminService, private chef: ChefService, private user: UserService) { }

  ngOnInit(): void { }

  // Validator for email
  email = new FormControl('', [Validators.required, Validators.email]);

  // Show the error in case the email address is not valid
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  // save or update action on a user information
  onSaveUser(item: any, action: string) {
    this.admin.onSaveUser(item, action);
  }

  // save or update action on a recipe information
  onSaveRecipe(item: any, action: string) {
    this.chef.onSave(item, action, this.chef.getResourceUrl());
  }

  // Create a new comment
  onCreateComment(data: Recipe): void {
    this.user.onCreateComment(data, this.comment);

  }

  // Add new ingredient
  addIngredient(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our ingredient
    if (value) {
      const newIngredient: Ingredient = {
        ingredient: value,
        id: 0
      };
      this.data.user.ingredients.push(newIngredient);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  // Remove item
  remove(item: any, list: Array<any>): void {
    const index = list.indexOf(item);

    if (index >= 0) {
      list.splice(index, 1);
    }
  }

  // Add new keyword
  addKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      const newKeyword: Keyword = {
        keyword: value,
        id: 0
      };
      this.data.user.keywords.push(newKeyword);
    }

    // Clear the input value
    event.chipInput!.clear();
  }
}
