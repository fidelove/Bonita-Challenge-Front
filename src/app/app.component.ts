import { Component } from "@angular/core";
import { UsersService } from './users/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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
    this.user.logout((response:any) => {
      this.router.navigateByUrl('/');
    },
      (error: any) => {
        this.router.navigateByUrl('/');

        if (error instanceof HttpErrorResponse) {
          confirm(error.error.message);
        } else {
          confirm("Unexpected error")
        }
      });
  }
}
