import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UserEditorComponent } from '../user-editor/user-editor.component'
import { User } from '../model/model';

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

  // Display a dialog which can be used to create a new user, display or modify an existing one
  openUserCreateOrEdit(editable: boolean, userData?: User) {

    // Create a copy, in case the update is not valid
    let userToBeDisplayed = Object.assign({}, userData);
    const dialogRef = this.dialog.open(UserEditorComponent, {
      width: '400px',
      panelClass: 'confirm-dialog-container',
      disableClose: false,
      data: {
        editorDisplay: userToBeDisplayed ? userToBeDisplayed.userName : 'Create new user',
        buttonSave: (userToBeDisplayed.id != 0) ? ( editable ? 'Update' : 'Close') : 'Save',
        buttonCancel: userToBeDisplayed ? ( editable ? 'Close' : '') : 'Cancel',
        buttonCancelDisplayed: userToBeDisplayed ? ( editable ? true : false) : true,
        user: userToBeDisplayed
      }
    });
  }
}
