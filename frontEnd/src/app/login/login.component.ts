import { Component, OnInit } from '@angular/core';
import { Login } from 'app/login';
import { LoginService } from 'app/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login:Login = new Login();

  constructor(private service:LoginService) {

  }

  ngOnInit() {

  }

  userLogin() {
    console.log(this.login);
   
    let resp = this.service.loginUser(this.login);

    console.log(resp);
    resp.subscribe(data=>alert("Login Successfully"),error=>alert("Login Failed"));
    console.log(resp.subscribe(data=>this.login));
  }
}
