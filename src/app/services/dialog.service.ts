import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DataEditorComponent } from '../users/data-editor/data-editor.component'
import { AbstractItem, User } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void { }

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

  // Check if the object is type of User
  instanceOfUser(object: any): object is User {
    return 'role' in object;
  }
  // Display a dialog which can be used to create a new user, display or modify an existing one
  openItemCreateOrEdit<T extends AbstractItem>(editable: boolean, receivedData: T) {

    // Create a copy, in case the update is not valid
    let userToBeDisplayed = Object.assign({}, receivedData);
    this.dialog.open(DataEditorComponent, {
      width: '400px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        isUserForm: this.instanceOfUser(userToBeDisplayed),
        editorDisplay: (userToBeDisplayed.id != 0) ? userToBeDisplayed.name : 'Create new user',
        buttonSave: (userToBeDisplayed.id != 0) ? (editable ? 'Update' : 'Close') : 'Save',
        buttonCancel: 'Cancel',
        buttonCancelDisplayed: (userToBeDisplayed.id != 0) ? (editable ? true : false) : true,
        user: userToBeDisplayed
      }
    });
  }
}
