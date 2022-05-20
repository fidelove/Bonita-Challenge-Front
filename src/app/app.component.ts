import { Component } from '@angular/core';
import { CommonService } from './services/common.service';
import { Router } from '@angular/router';
import { environment } from '../environments/environment'
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Bonitasoft Challenge';

  constructor(public service: CommonService, private router: Router, private login: LoginComponent) {

    // When loading the main page, if the sessionID is not stored just go to the login page
    if (this.service.getToken() == '') {
      this.router.navigateByUrl('/');
    }
  }

  // Logout action
  logout() {
    this.login.logout();
  }
}