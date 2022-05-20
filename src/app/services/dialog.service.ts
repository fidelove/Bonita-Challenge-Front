import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { DataEditorComponent } from '../dialog/data-editor/data-editor.component'
import { AbstractItem, RoleType } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void { }

  openSuccessDialog<T extends AbstractItem>(item: T, action: string) {

    var itemType: string;
    switch (item.contextType) {
      case RoleType.ADMIN: {
        itemType = 'User';
        break;
      }
      case RoleType.CHEF: {
        itemType = 'Recipe';
        break;
      }
      case RoleType.USER: {
        itemType = 'Comment';
        break;
      }
    }
    this.openDialog(itemType + ' ' + action,
      'The ' + itemType.toLowerCase() + ' ' + item.displayName + ' has been ' + action + ' successfully', 'Ok', false);
  }

  // Display a dialog with alerts
  openDialog(dialogTitle: string, dialogContent: string, dialogButtonText: string, dialogCancelButtonDisplayed: boolean): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        title: dialogTitle,
        content: dialogContent,
        buttonText: dialogButtonText,
        dialogCancelButtonDisplayed: dialogCancelButtonDisplayed
      }
    });
    return dialogRef.afterClosed();
  }

  // Display a dialog which can be used to create a new user, display or modify an existing one
  openItemCreateOrEdit<T extends AbstractItem>(editable: boolean, receivedData: T) {

    // Create a copy, in case the update is not valid, and display the dialog
    let item = Object.assign({}, receivedData);
    this.dialog.open(DataEditorComponent, {
      width: '400px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        isAdminForm: (item.contextType == RoleType.ADMIN),
        isUserForm: (item.contextType == RoleType.USER),
        editorDisplay: (item.id != 0) ? item.name : (item.contextType == RoleType.ADMIN ? 'Create new user' : 'Create new recipe'),
        buttonSave: (item.id != 0) ? (editable ? 'Update' : 'Close') : 'Save',
        buttonCancel: item.contextType == RoleType.USER ? 'Add new comment' : 'Cancel',
        buttonCancelDisplayed: item.contextType == RoleType.USER ? true : ((item.id != 0) ? (editable ? true : false) : true),
        editable: editable,
        user: item
      }
    });
  }
}
