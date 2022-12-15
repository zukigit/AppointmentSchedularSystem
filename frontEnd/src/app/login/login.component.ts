import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtResponse } from 'app/jwt-response';
import { Login } from 'app/login';
import { LoginService } from 'app/login.service';
import { UserService } from 'app/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  visible:boolean=true;
  changetype:boolean=true;
  jwtResponse:JwtResponse = new JwtResponse();
  viewpass(){
    this.visible=!this.visible;
    this.changetype=!this.changetype;
  }


  login:Login = new Login();

  constructor(private service:LoginService, private router:Router,private userS:UserService) {

  }

  ngOnInit() {

  }

  userLogin() {

    this.service.loginUser(this.login).subscribe(
      data =>{
        this.jwtResponse = data;
        localStorage.setItem("jwtToken", this.jwtResponse.token)
        console.log("token is: " + this.jwtResponse.token)
        this.router.navigate(['/admin/dashboard']);
      },
      error => {
        alert("Login Failed!")
        console.log("exception occured");
      }
    )
  }
}
