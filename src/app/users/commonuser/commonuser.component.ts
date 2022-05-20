import { CommonService } from 'src/app/services/common.service';
import { DialogService } from 'src/app/services/dialog.service';
import { Component } from '@angular/core';
import { AbstractItem } from 'src/app/model/model';
import { CommonUserService } from 'src/app/services/commonuser.service';

@Component({
  selector: 'app-commonuser',
  templateUrl: './commonuser.component.html',
  styleUrls: ['./commonuser.component.css']
})

export class CommonUserComponent<T extends AbstractItem> {

  // The listed items
  newElementButton: string;
  buttonHidden: boolean;
  searchElements: string;

  constructor(public service: CommonService, protected commonService: CommonUserService<T>) { }

  // When a delete button is pressed
  onDelete($e, item: T) {
    $e.preventDefault();
    $e.stopImmediatePropagation();
    this.commonService.onDelete(item);

  }

  onSearch($event: any) {
    this.commonService.onSearch(this.searchElements);
  }

  // When pan edit button is pressed
  onEdit($e, item: T) {
    $e.preventDefault();
    $e.stopImmediatePropagation();

    // When edit an existing user, display the dialog
    this.commonService.openItemCreateOrEdit<T>(true, item);
  }

  // An iten has been selected
  navigate(item: T) {
    // Open a new dialog with the user info
    this.commonService.openItemCreateOrEdit<T>(false, item);
  }

  createNewElement(){
    this.commonService.createNewElement();
  }
}