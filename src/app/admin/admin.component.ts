import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users.service';
import { GlobalConstants } from '../common/global-constants';
import { User } from '../model/model';
//import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

	selectedOptions: number[];
	items = []
//	constructor(private http: HttpClient, private userService: UsersService, private dialog: ConfirmDialogComponent) { }
	constructor(private http: HttpClient, private userService: UsersService) { }

	ngOnInit(): void {
		this.http.get<Array<User>>(GlobalConstants.apiURL + "users", { headers: { sessionId: this.userService.getToken() } }).subscribe(
			(response) => {
				if (response) {
					this.items = response;
				}
			},
			(error) => {
				this.userService.handleError(error);
			});
	}

	onEdit($e, item: User) {
		$e.preventDefault();
		$e.stopImmediatePropagation();

		console.log("onEdit clicked");
	}

	onDelete($e, item: User) {
		$e.preventDefault();
		$e.stopImmediatePropagation();

		//		console.log("onDelete clicked");
		//		this.dialog.title='Delete user ${item.userName}'
		//		this.dialog.buttonSubmitText='Delete'
		//		this.dialog.content='Are you sure you want to delete the user ${item.userName}?'
		//		this.dialog.openDialog();
//		this.dialog.openDialog();
	}

	navigate(item) {
		console.log("navigate clicked");
	}
}