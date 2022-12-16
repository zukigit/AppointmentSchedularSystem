import { Component, OnInit } from '@angular/core';
import { User } from 'app/user';
import { UserService } from 'app/user.service';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { data } from 'jquery';
import * as e from 'express';
import { filter } from 'rxjs';
import { RegisterationRequestModel } from 'app/registeration-request-model';
import { Team } from 'app/team';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  
   userData: any=[];
   userDetails : any=[];
   userlist: any=[];
   department:any=[];
   teamArray:Team[];
   tempTeam:Team[];
   test = ['a', 'b', 'c'];
   team:Team = new Team();

  user:User = new User();
  registerModel:RegisterationRequestModel = new RegisterationRequestModel();

  constructor(private userServices: UserService, private http:HttpClient,private userList : UserService,
    private router:Router) {
  }

  ngOnInit() {

     this.department = this.userServices.getDepartment().subscribe(data=>this.department=data);
 //    this.department = this.userServices.getDepartment(); 
    this.userServices.getTeam().subscribe(
      {
        next: (data) => {
          this.teamArray = data;
        }
      }
    )
     this.userDetails= this.userServices.getUserList();

  }

    onSelect(department){ 
      this.tempTeam = this.teamArray.filter(e=> {
        return e.department.department_id == department.target.value
      });
      console.log("teams length is" + this.teamArray.length);
    }


  updateUser(id: string) {
    this.userServices.getUserId(id)
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
        this.userServices.createUser(this.registerModel).subscribe(data => {this.router.navigate(['/user-details/'])}
  );

 } 

 getUsers() {
  this.userData = this.userlist.getDepartment().subscribe(data=>this.department=data);
  console.log("departments " + this.department.department_name)
  this.userData = this.userlist.getTeam().subscribe(data=> this.teamArray=data);
  this.userData = this.userlist.getUserList(this.userServices);
//  console.log = ("users "+this.userData.employee_id+this.userData.name);
}

}
