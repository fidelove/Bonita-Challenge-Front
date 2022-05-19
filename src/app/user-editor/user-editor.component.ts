import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../model/model';
import { UsersService } from '../services/users.service';
import { environment } from '../../environments/environment'
import { AdminComponent } from '../admin/admin.component';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent implements OnInit {

  hidePassword = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UsersService, private admin: AdminComponent) { }

  ngOnInit(): void {
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  // Show the error in case the email address is not valid
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  // save or update action on a user information
  onSave(item: User, action: string) {
    // If save, it is the creation of a new user
    if ('Save' == action) {

      this.userService.post<User>(environment.userUrl, item).subscribe(
        () => {
          this.admin.updateUsers();
        },
        (error) => {
          this.userService.handleError(error);
        }
      );

    // If update, it is the update of a new user
    } else if ('Update' == action) {
      this.userService.put<User>(environment.userUrl + '/' + item.id, item).subscribe(
        () => {
          this.admin.updateUsers();
        },
        (error) => {
          this.userService.handleError(error);
        }
      );
    }
  }
}
