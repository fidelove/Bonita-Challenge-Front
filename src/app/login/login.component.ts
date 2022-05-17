import { Component, OnInit } from '@angular/core';
import { UsersService } from "../users/users.service";
import { Router } from '@angular/router';
import { User } from '../model/user'
import { RoleType } from '../model/role-type'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  credentials = {
    "userName": "",
    "userPassword": ""
  }

  constructor(public userService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.userService.login(this.credentials, (response: User) => {
      if (response){
        this.userService.navigateByRole(response.role);
      }
    },
      (error: any) => {

        console.log(JSON.stringify(error));
        if (error instanceof HttpErrorResponse) {
          confirm(error.error.message);
        } else {
          confirm("Unexpected error")
        }
      });
    return false;
  }



}