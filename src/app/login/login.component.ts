import { Component, OnInit } from '@angular/core';
import { UsersService } from "../services/users.service";
import { LoggedUser } from '../model/model'

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

  constructor(public userService: UsersService) { }

  ngOnInit(): void {
  }

  login() {
    this.userService.login(this.credentials, (response: LoggedUser) => {
      if (response){
        this.userService.navigateByRole(response.role);
      }
    },
      (error: any) => {
        this.userService.handleError(error);
      });
    return false;
  }



}