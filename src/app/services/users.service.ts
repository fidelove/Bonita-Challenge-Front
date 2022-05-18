import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { Router } from '@angular/router';
import { RoleType } from '../model/model'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { DialogService } from './dialog.service'

@Injectable({
  providedIn: "root"
})
export class UsersService {

  authenticated = false;

  constructor(private http: HttpClient, private cookies: CookieService, private router: Router, private dialog: DialogService) { }

  get<T>(url: string): Observable<T> {
    const headers = { 'sessionId': this.getToken() };
    return this.http.get<T>(environment.apiUrl + url, { headers });
  }

  post<T>(url: string, content: any): Observable<T> {
    const headers = { 'sessionId': this.getToken() };
    return this.http.post<T>(environment.apiUrl + url, content, { headers });
  }

  put<T>(url: string, content: any): Observable<T> {
    const headers = { 'sessionId': this.getToken() };
    return this.http.put<T>(environment.apiUrl + url, content, { headers });
  }

  delete<T>(url: string): Observable<T> {
    const headers = { 'sessionId': this.getToken() };
    return this.http.delete<T>(environment.apiUrl + url, { headers });
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
    this.cookies.set('token', token);
  }
  getToken() {
    return this.cookies.get('token');
  }

  handleError(error: any) {
    console.log(JSON.stringify(error));
    if (error instanceof HttpErrorResponse) {
      this.dialog.openDialog('Error', error.error.message, 'Ok', false);
    } else {
      this.dialog.openDialog('Error', 'Unexpected error', 'Ok', false);
    }
  }
}
