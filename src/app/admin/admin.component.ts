import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../model/model';
import { DialogService } from '../services/dialog.service';
import { environment } from '../../environments/environment'

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

	selectedOptions: number[];
	items = []
	constructor(private userService: UsersService, private dialog: DialogService) { }

	ngOnInit(): void {
		this.updateUsers();
	}

	updateUsers() {
		this.userService.get<Array<User>>(environment.allUsersUrl).subscribe(
			(response) => {
				this.items = response;
			},
			(error) => {
				this.userService.handleError(error);
			}
		);
	}

	onEdit($e, item: User) {
		$e.preventDefault();
		$e.stopImmediatePropagation();
		this.navigate(item);
	}

	onDelete($e, item: User) {
		$e.preventDefault();
		$e.stopImmediatePropagation();
		this.dialog.openDialog("Delete user " + item.userName,
			"Are you sure you want to delete the user " + item.userName,
			"Delete", true).subscribe(result => {
				if (result) {
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

	navigate(item) {
		console.log("navigate clicked");
	}
}