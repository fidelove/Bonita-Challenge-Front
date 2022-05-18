import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }
  title: string;
  content: string;
  buttonText: string;
  cancelButtonHidden: boolean;

  ngOnInit(): void { }

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

}
