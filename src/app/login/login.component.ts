import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { LoggedUser } from '../model/model'
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidePassword = true;
  credentials = {
    'userName': '',
    'userPassword': ''
  }

  constructor(public userService: UsersService) { }

  ngOnInit(): void {
  }

  login() {
    // Invoke the login resource
    this.userService.post<LoggedUser>(environment.loginUrl, this.credentials).subscribe(
      (response) => {
        if (response && response.sessionId) {
          // store the sessionId, and navigate to the user role page
          this.userService.authenticated = true;
          this.userService.setToken(response.sessionId);
          this.userService.navigateByRole(response.role);
        } else {
          this.userService.authenticated = false;
          this.userService.setToken('');
        }
      },
      (error) => {
        this.userService.handleError(error);
      });
  }
}