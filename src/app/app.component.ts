import { Component } from '@angular/core';
import { CommonService } from './services/common.service';
import { Router } from '@angular/router';
import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Bonitasoft Challenge';

  constructor(public service: CommonService, private router: Router) {

    // When loading the main page, if the sessionID is not stored just go to the login page
    if (this.service.getToken() == '') {
      this.router.navigateByUrl('/');
    }
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