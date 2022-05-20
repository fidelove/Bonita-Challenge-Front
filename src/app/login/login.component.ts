import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { LoggedUser } from '../model/model'
import { environment } from '../../environments/environment'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidePassword = true;
  credentials = {
    'name': '',
    'userPassword': ''
  }

  constructor(public service: CommonService, public router: Router) { }

  ngOnInit(): void {
  }

  login() {
    // Invoke the login resource
    this.service.post<LoggedUser>(environment.loginUrl, this.credentials).subscribe(
      (response) => {
        if (response && response.sessionId) {
          // store the sessionId, and navigate to the user role page
          this.service.authenticated = true;
          this.service.setToken(response.sessionId);
          this.service.navigateByRole(response.role);
        } else {
          this.service.authenticated = false;
          this.service.setToken('');
        }
      },
      (error) => {
        this.service.handleError(error);
      });
  }

   // Logout action
  logout() {
    this.service.get<boolean>(environment.logoutUrl).subscribe(
      () => {
        // If logout was correct, go to the login page, and remove the sessionId
        this.router.navigateByUrl('/');
        this.service.authenticated = false;
        this.service.setToken('');
      },
      (error => {
        this.service.handleError(error);
      })
    );
  }
}