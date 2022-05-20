import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { DialogService } from './dialog.service';
import { AbstractItem } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export abstract class CommonUserService<T extends AbstractItem> {

  constructor(protected service: CommonService, protected dialog: DialogService) { }

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

  // Replace the new old user by the new received
  updateUser<T extends AbstractItem>(user: T) {
    var userToBeReplaced = this.service.items.filter(item => (user.id == item.id))[0];
    var index = this.service.items.indexOf(userToBeReplaced);
    if (index > -1) {
      this.service.items[index] = user;
      this.processResponse(this.service.items);
      this.dialog.openSuccessDialog(user, 'updated');
    }
  }

  // When a delete button is pressed
  onDelete(item: T) {

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

  onSearch(criteria: string) {

    // Split the search criteria
    const searchCriteria = '?keywords=' + criteria.trim().split(' ').join('&');
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
  addUser<T extends AbstractItem>(user: T) {
    this.service.items.push(user);
    this.processResponse(this.service.items);
    this.dialog.openSuccessDialog(user, 'created');
  }

  // Opens a new dialog with user info
  openItemCreateOrEdit<T extends AbstractItem>(editable: boolean, receivedData: T) {
    this.dialog.openItemCreateOrEdit<T>(editable, receivedData);
  }

  onSave<T extends AbstractItem>(item: any, action: string, url: string) {
    // If save, it is the creation of a new user
    if ('Save' == action) {

      this.service.post<T>(url, item).subscribe(
        (response) => {
          this.addUser(response);
        },
        (error) => {
          this.service.handleError(error);
        }
      );

      // If update, it is the update of a new user
    } else if ('Update' == action) {
      this.service.put<T>(url + '/' + item.id, item).subscribe(
        (response) => {
          this.updateUser<T>(response);
        },
        (error) => {
          this.service.handleError(error);
        }
      );
    }
  }


  // Abstract Methods to be implemented by sibling class
  // Get the URL to get all the items of the resource
  abstract getAllItemsUrl(): string;

  // Get the URL to get the resource URL
  abstract getResourceUrl(): string;

  // For dialogs, get the title of the delete dialog
  abstract getDeleteTitle(item: T): string;

  // For dialogs, get the content of the delete dialog
  abstract getDeleteContent(item: T): string;

  // Get the URL to delete a resource
  abstract getDeleteUrl(item: T);

  // Create a new item
  abstract createNewElement(): any;

  // When all items is requested, the response is processed to display the correct data
  abstract processResponse(response: T[]);
}
