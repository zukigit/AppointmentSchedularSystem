import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from 'app/model/user';
import { UserService } from 'app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { data } from 'jquery';
import * as e from 'express';
import { filter } from 'rxjs';
import { RegisterationRequestModel } from 'app/model/registeration-request-model';
import { Team } from 'app/model/team';
// import swal from 'sweetalert';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // alert:boolean=false
  userData: any = [];
  userDetails: any = [];

  userDataDetails: any = [];
  userlist: any = [];
  department: any = [];
  teamArray: Team[];
  tempTeam: Team[];
  test = ['a', 'b', 'c'];
  team: Team = new Team();

  user: User = new User();
  registerModel: RegisterationRequestModel = new RegisterationRequestModel();

  constructor(private userServices: UserService, private http: HttpClient, private userList: UserService,
    private router: Router) {
  }

  validateNumber(event) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  ngOnInit() {

    this.userDataDetails = this.userServices.getUserDetails().subscribe(data => this.userDataDetails = data);

    this.department = this.userServices.getDepartment().subscribe(data => this.department = data);
    //    this.department = this.userServices.getDepartment(); 
    this.userServices.getTeam().subscribe(
      {
        next: (data) => {
          this.teamArray = data;
        }
      }
    )

  }

  dataOfUser() {
    this.userDataDetails = this.userServices.getUserDetails().subscribe(data => this.userDataDetails = data);
    console.log("user data is called" + this.userDataDetails);
  }

  onSelect(department) {
    this.tempTeam = this.teamArray.filter(e => {
      return e.department.department_id == department.target.value
    });
    console.log("teams length is" + this.teamArray.length);
  }


  updateUser(id: string) {
    this.userServices.getUserById(id)
      .subscribe(
        data => {
          this.userlist = data
        },
        error => console.log(error));
  }

  doRegisteration() {
    
    this.team.team_id = this.user.team_id;
    this.registerModel.employee_id = this.user.employee_id;
    this.registerModel.name = this.user.name;
    this.registerModel.password = this.user.password;
    this.registerModel.phone_number = this.user.phone_number;
    this.registerModel.gender = this.user.gender;
    this.registerModel.role = this.user.role;
    this.registerModel.position = this.user.position;
    this.registerModel.team = this.team;
    this.userServices.createUser(this.registerModel).subscribe(
      data => { this.router.navigate(['admin/user-details']);
                // window.alert("Employee succesfully Added!")
                // swal("Employee succesfully Added!");
                Swal.fire('Added One Employee!!', 'Employee added succesfully!', 'success')
                // window.location.reload();
                console.log("Successfully");
            },
            error => {console.log("Not create same userid");
            this.router.navigate(['admin/addEmployeeModal']);
            alert("Can't create same userid")
          }
    );

  }

  deleteUserById(employee_id){
   
      this.userServices.deleteUser(employee_id)
      .subscribe(book=>{
        this.userDataDetails();
      })
     
  }
  // closeAlert(){
  //   this.alert=false;
  //     }
  // alertWithSuccess(){  
  //   Swal.fire('Thank you...', 'You submitted succesfully!', 'success')  
  // } 
}
