import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { RoleType } from '../model/model'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { DialogService } from './dialog.service'

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  authenticated = false;
  items: any[];

  constructor(private http: HttpClient, private cookies: CookieService, private router: Router, private dialog: DialogService) { }

  // Generic GET action
  get<T>(url: string): Observable<T> {
    const headers = { 'sessionId': this.getToken() };
    return this.http.get<T>(environment.apiUrl + url, { headers });
  }

  // Generic POST action
  post<T>(url: string, content: any): Observable<T> {
    const headers = { 'sessionId': this.getToken() };
    return this.http.post<T>(environment.apiUrl + url, content, { headers });
  }

  // Generic PUT action
  put<T>(url: string, content: any): Observable<T> {
    const headers = { 'sessionId': this.getToken() };
    return this.http.put<T>(environment.apiUrl + url, content, { headers });
  }

  // Generic DELETE action
  delete<T>(url: string): Observable<T> {
    const headers = { 'sessionId': this.getToken() };
    return this.http.delete<T>(environment.apiUrl + url, { headers });
  }

  // Acording to the role, the app is routed to its view
  navigateByRole(role: RoleType) {
    switch (role) {
      case RoleType.ADMIN:
        this.router.navigateByUrl('/admin');
        break;
      case RoleType.CHEF:
        this.router.navigateByUrl('/chef');
        break;
      case RoleType.USER:
        this.router.navigateByUrl('/user');
        break;
    }
  }

  // Store the session ID
  setToken(token: any) {
    this.cookies.set('token', token);
  }
  getToken() {
    return this.cookies.get('token');
  }

  // Handle errors, displaying a dialog
  handleError(error: any) {
    console.log(JSON.stringify(error));
    if (error instanceof HttpErrorResponse) {
      this.dialog.openDialog('Error', error.error.message, 'Ok', false);
      if(HttpStatusCode.Unauthorized == error.status) {
        this.authenticated=false;
        this.setToken('');
        this.router.navigateByUrl('/');
      }
    } else {
      this.dialog.openDialog('Error', 'Unexpected error', 'Ok', false);
    }
  }
}
