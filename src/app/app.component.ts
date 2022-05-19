import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { Router } from '@angular/router';
import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Bonitasoft Challenge';

  constructor(public user: UsersService, private router: Router) {

    // When loading the main page, if the sessionID is not stored just go to the login page
    if (this.user.getToken() == '') {
      this.router.navigateByUrl('/');
    }
  }

  // Logout action
  logout() {
    this.user.get<boolean>(environment.logoutUrl).subscribe(
      () => {
        // If logout was correct, go to the login page, and remove the sessionId
        this.router.navigateByUrl('/');
        this.user.authenticated = false;
        this.user.setToken('');
      },
      (error => {
        this.user.handleError(error);
      })
    );
  }
}