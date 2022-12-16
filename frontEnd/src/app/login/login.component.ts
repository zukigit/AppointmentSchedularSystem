import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtResponse } from 'app/model/jwt-response';
import { Login } from 'app/model/login';
import { LoginService } from 'app/services/login.service';
import { UserService } from 'app/services/user.service';


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
        localStorage.setItem("jwtToken", this.jwtResponse.token);
        localStorage.setItem("loggedInUserId", this.jwtResponse.userId)

        console.log("token is: " + this.jwtResponse.token);
        console.log("role is: " + this.jwtResponse.role);
        console.log("userId is: " + this.jwtResponse.userId);

        if(this.jwtResponse.role == "ROLE_ADMIN"){
          this.router.navigate(['/admin/dashboard']);
        } else if(this.jwtResponse.role == "ROLE_USER") {
          this.router.navigate(['/user/test']);
        } else if(this.jwtResponse.role == "ROLE_TRAINEE") {
          this.router.navigate(['/trainee/test']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      error => {
        alert("Login Failed!")
        console.log("exception occured");
      }
    )
  }
}
