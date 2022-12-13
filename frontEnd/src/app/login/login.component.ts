import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'app/login';
import { LoginService } from 'app/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  visible:boolean=true;
  changetype:boolean=true;
  viewpass(){
    this.visible=!this.visible;
    this.changetype=!this.changetype;
  }


  login:Login = new Login();

  constructor(private service:LoginService, private router:Router) {

  }

  ngOnInit() {

  }

  userLogin() {

    this.service.loginUser(this.login).subscribe(
      data =>{
        console.log("response receive");
        this.router.navigate(['/dashboard']);
      },
      error => {
      
        alert("Login Failed!")
        console.log("exception occured");
      }
    )
  }
}
