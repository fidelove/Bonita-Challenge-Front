import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User, RoleType } from '../model/model';
import { DialogService } from '../services/dialog.service';
import { environment } from '../../environments/environment'

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

	// The listed users
	items = []
	constructor(private userService: UsersService, private dialog: DialogService) { }

	ngOnInit(): void {
		this.updateUsers();
	}

	updateUsers() {
		// Invoke all users resource
		this.userService.get<Array<User>>(environment.allUsersUrl).subscribe(
			(response) => {

				// And update the listed users
				this.items = response;
				// If it has been a reload I check if the logout button is displayed
				this.userService.authenticated = this.userService.getToken() != '';
			},
			(error) => {
				// Display error
				this.userService.handleError(error);
			}
		);
	}

	onEdit($e, item: User) {
		$e.preventDefault();
		$e.stopImmediatePropagation();

		// When edit an existing user, display the dialog
		this.dialog.openUserCreateOrEdit(true, item);
	}

	onDelete($e, item: User) {
		$e.preventDefault();
		$e.stopImmediatePropagation();

		// When a delete button is selecte, ask if it is sure
		this.dialog.openDialog("Delete user " + item.userName,
			"Are you sure you want to delete the user " + item.userName,
			"Delete", true).subscribe(result => {
				if (result) {
					// Invoke the delete action
					this.userService.delete<boolean>(environment.userUrl + "/" + item.id).subscribe(
						(response) => {
							this.updateUsers();
						},
						(error) => {
							this.userService.handleError(error);
							this.updateUsers();
						}
					);
				}
			});
	}

	navigate(item: User) {
		// Open a new dialog with the user info
		this.dialog.openUserCreateOrEdit(false, item);
	}

	createNewUser() {
		const user: User = {
			id: 0,
			userName: '',
			userPassword: '',
			userEmail: '',
			role: RoleType.ADMIN
		}
		this.dialog.openUserCreateOrEdit(true, user);
	}
}