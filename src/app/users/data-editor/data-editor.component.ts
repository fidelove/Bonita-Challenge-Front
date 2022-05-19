import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { environment } from '../../../environments/environment'
import { AdminComponent } from '../admin/admin.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { AbstractItem, Ingredient, Keyword, Recipe, User } from 'src/app/model/model';
import { ChefComponent } from '../chef/chef.component';
import { CommonUserComponent } from '../commonuser/commonuser.component';

@Component({
  selector: 'app-data-editor',
  templateUrl: './data-editor.component.html',
  styleUrls: ['./data-editor.component.css']
})
export class DataEditorComponent implements OnInit {

  hidePassword = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: CommonService, private admin: AdminComponent, private chef: ChefComponent) { }

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
    this.onSave<User, AdminComponent>(item, action, this.admin.getResourceUrl(), this.admin);
  }

  // save or update action on a recipe information
  onSaveRecipe(item: any, action: string) { 
    this.onSave<Recipe, ChefComponent>(item, action, this.chef.getResourceUrl(), this.chef);
  }


  onSave<T extends AbstractItem, U extends CommonUserComponent<T>>(item: any, action: string, url: string, userComponent: U) {
    // If save, it is the creation of a new user
    if ('Save' == action) {

      this.service.post(url, item).subscribe(
        () => {
          userComponent.updateItems();
        },
        (error) => {
          this.service.handleError(error);
        }
      );

      // If update, it is the update of a new user
    } else if ('Update' == action) {
      this.service.put(url + '/' + item.id, item).subscribe(
        () => {
          userComponent.updateItems();
        },
        (error) => {
          this.service.handleError(error);
        }
      );
    }
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
