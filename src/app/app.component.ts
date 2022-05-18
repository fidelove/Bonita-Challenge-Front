import { Component } from "@angular/core";
import { UsersService } from './services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment'

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  title = "Bonitasoft Challenge";

  constructor(public user: UsersService, private router: Router) {

    if (this.user.getToken() == "") {
      this.router.navigateByUrl('/');

    }
  }

  logout() {
    this.user.get<boolean>(environment.logoutUrl).subscribe(
      (response) => {
        this.router.navigateByUrl('/');
        this.user.authenticated = false;
        this.user.setToken("");
      },
      (error => {
        this.user.handleError(error);
      })
    );
  }
}