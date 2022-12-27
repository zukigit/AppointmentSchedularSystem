import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtResponse } from 'app/model/jwt-response';
import { Login } from 'app/model/login';
import { LoginService } from 'app/services/login.service';
import { UserService } from 'app/services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';


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
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loggedInUserId");
    localStorage.removeItem("loggedInUserRole");

    this.service.loginUser(this.login).subscribe(
      data =>{
        this.jwtResponse = data;
        localStorage.setItem("jwtToken", this.jwtResponse.token);
        localStorage.setItem("loggedInUserId", this.jwtResponse.userId);
        localStorage.setItem("loggedInUserRole", this.jwtResponse.role);


        if(this.jwtResponse.role == "ROLE_ADMIN"){
          console.log("go to dashboard");
          this.router.navigate(['/admin/dashboard']).then(()=>{
            Swal.fire('Loggined Success!', 'Loggined as Admin.', 'success')
            // window.location.reload();
            
        });
        } else if(this.jwtResponse.role == "ROLE_USER") {
          this.router.navigate(['/user/test']).then(()=>{
            Swal.fire('Loggined Success!', 'Loggined as User.', 'success')
            // window.location.reload();
        });
        } else if(this.jwtResponse.role == "ROLE_TRAINEE") {
          this.router.navigate(['/trainee/test']).then(()=>{
            Swal.fire('Loggined Success!', 'Loggined as Trainee.', 'success')
            // window.location.reload();
        });
        } else {
          this.router.navigate(['/login']);
        }
      },
      error => {
        alert("UserId and Password doesn't match")
        console.log("exception occured");
      }
    )
  }
}
