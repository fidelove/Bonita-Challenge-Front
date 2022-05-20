import { CommonService } from 'src/app/services/common.service';
import { DialogService } from 'src/app/services/dialog.service';
import { Component } from '@angular/core';
import { AbstractItem, RoleType } from 'src/app/model/model';

@Component({
  selector: 'app-commonuser',
  templateUrl: './commonuser.component.html',
  styleUrls: ['./commonuser.component.css']
})

export class CommonUserComponent<T extends AbstractItem> {

  // The listed items
  newElementButton: string;
  buttonHidden: boolean;
  searchCriteria: string;

  constructor(public service: CommonService, protected dialog: DialogService) { }

  updateItems() {
    // Invoke all users resource
    this.service.get<Array<T>>(this.getAllItemsUrl()).subscribe(
      (response) => {

        // Process the response
        this.processResponse(response);
        // And update the listed items
        this.service.items = response;
        // If it has been a reload I check if the logout button is displayed
        this.service.authenticated = this.service.getToken() != '';
      },
      (error) => {
        // Display error
        this.service.handleError(error);
      }
    );
  }

  // When a delete button is pressed
  onDelete($e, item: T) {
    $e.preventDefault();
    $e.stopImmediatePropagation();

    // When a delete button is selecte, ask if it is sure
    this.dialog.openDialog(this.getDeleteTitle(item),
      this.getDeleteContent(item),
      'Delete', true).subscribe(result => {
        if (result) {
          // Invoke the delete action
          this.service.delete<boolean>(this.getDeleteUrl(item)).subscribe(
            () => {
              this.updateItems();
              this.dialog.openSuccessDialog(item, 'deleted');
            },
            (error) => {
              this.service.handleError(error);
              // Refresh the data, in order to be coherent with the database
              this.updateItems();
            }
          );
        }
      });
  }

  onSearch($event: any) {

    // Split the search criteria
    const searchCriteria = '?keywords=' + this.searchCriteria.trim().split(' ').join('&');
    this.service.get<Array<T>>(this.getAllItemsUrl() + searchCriteria).subscribe(
      (response) => {

        // Process the response
        this.processResponse(response);
        // And update the listed items
        this.service.items = response;
      },
      (error) => {
        this.service.handleError(error);

      });
  }

  // Add a new item to the displayed list
  addUser(user: T) {
    this.service.items.push(user);
    this.processResponse(this.service.items);
    this.dialog.openSuccessDialog(user, 'created');
  }

  // Replace the new old user by the new received
  updateUser(user: T) {
    var userToBeReplaced = this.service.items.filter(item => (user.id == item.id))[0];
    var index = this.service.items.indexOf(userToBeReplaced);
    if (index > -1) {
      this.service.items[index] = user;
      this.processResponse(this.service.items);
      this.dialog.openSuccessDialog(user, 'updated');
    }
  }

  // Comment created succesfully
  createComment<T extends AbstractItem>(comment: T) {
      this.dialog.openSuccessDialog(comment, 'created');
  }


  // When pan edit button is pressed
  onEdit($e, item: T) {
    $e.preventDefault();
    $e.stopImmediatePropagation();

    // When edit an existing user, display the dialog
    this.dialog.openItemCreateOrEdit<T>(true, item);
  }

  // An iten has been selected
  navigate(item: T) {
    // Open a new dialog with the user info
    this.dialog.openItemCreateOrEdit<T>(false, item);
  }

  // Methods to be implemented by sibling class
  // Get the URL to get all the items of the resource
  getAllItemsUrl(): string {
    return '';
  }

  // Get the URL to get the resource URL
  getResourceUrl(): string {
    return '';
  }

  // For dialogs, get the title of the delete dialog
  getDeleteTitle(item: T): string {
    return '';
  }

  // For dialogs, get the content of the delete dialog
  getDeleteContent(item: T): string {
    return '';
  }

  // Get the URL to delete a resource
  getDeleteUrl(item: T) {
    return '';
  }

  // Create a new item
  createNewElement(): any { }

  // When all items is requested, the response is processed to display the correct data
  processResponse(response: T[]) { }
}