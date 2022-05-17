import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { Router } from '@angular/router';
import { User } from '../model/user'
import { RoleType } from '../model/role-type';

@Injectable({
  providedIn: "root"
})
export class UsersService {

  authenticated = false;
  host = "http://localhost:8080/api/v1/";

  constructor(private http: HttpClient, private cookies: CookieService, private router: Router) { }

  login(credentials: any, callback: any, errorf: any) {
    return this.http.post<User>(this.host + "login", credentials).subscribe(
      (response) => {
        if (response && response.sessionId) {
          this.authenticated = true;
          this.setToken(response.sessionId);
        } else {
          this.authenticated = false;
          this.setToken("");
        }
        callback(response);
      },
      (error) => {
        errorf(error);
      });
  }

  logout(callback: any, errorf: any) {

    return this.http.post(this.host + "logout",{sessionId: this.getToken()}).subscribe(
      (response) => {
        if (response) {
          this.authenticated = false;
          this.setToken("");
        }
        callback(response);
      },
      (error) => {
        this.authenticated = false;
        this.setToken("");
        errorf(error);
      });
  }

  navigateByRole(role: RoleType) {

    switch (role) {
      case RoleType.ADMIN:
        this.router.navigateByUrl('/admin');
        break;
      case RoleType.CHEF:
        break;
      case RoleType.USER:
        break;
    }
  }

  setToken(token: any) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }
}
