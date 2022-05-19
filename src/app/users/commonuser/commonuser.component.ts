import { CommonService } from 'src/app/services/common.service';
import { DialogService } from 'src/app/services/dialog.service';
import { Component } from '@angular/core';
import { AbstractItem } from 'src/app/model/model';

@Component({
  selector: 'app-commonuser',
  templateUrl: './commonuser.component.html',
  styleUrls: ['./commonuser.component.css']
})

export class CommonUserComponent<T extends AbstractItem> {

  // The listed items
  items = []
  newElementButton = '';

  constructor(protected service: CommonService, protected dialog: DialogService) { }

  updateItems() {
    // Invoke all users resource
    this.service.get<Array<T>>(this.getAllItemsUrl()).subscribe(
      (response) => {

        // And update the listed items
        this.items = response;
        // If it has been a reload I check if the logout button is displayed
        this.service.authenticated = this.service.getToken() != '';
      },
      (error) => {
        // Display error
        this.service.handleError(error);
      }
    );
  }

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
            },
            (error) => {
              this.service.handleError(error);
              this.updateItems();
            }
          );
        }
      });
  }

  onEdit($e, item: T) {
    $e.preventDefault();
    $e.stopImmediatePropagation();

    // When edit an existing user, display the dialog
    this.dialog.openItemCreateOrEdit<T>(true, item);
  }

  navigate(item: T) {
    // Open a new dialog with the user info
    this.dialog.openItemCreateOrEdit<T>(false, item);
  }

  // Methods to be implemented by sibling class
  getAllItemsUrl(): string {
    return '';
  }

  getResourceUrl(): string {
    return '';
  }

  getDeleteTitle(item: T): string {
    return '';
  }

  getDeleteContent(item: T): string {
    return '';
  }

  getDeleteUrl(item: T) {
    return '';
  }

  createNewElement(): any { }
}