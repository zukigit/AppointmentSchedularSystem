import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user';
import { UserService } from 'app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { data } from 'jquery';
import * as e from 'express';
import { filter } from 'rxjs';
import { RegisterationRequestModel } from 'app/model/registeration-request-model';
import { Team } from 'app/model/team';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  userData: any = [];
  userDetails: any = [];

  userDataDetails: any = [];
  userlist: any = [];
  department: any = [];
  teamArray: Team[];
  tempTeam: Team[];
  test = ['a', 'b', 'c'];
  team: Team = new Team();

  user: User;
  registerModel: RegisterationRequestModel = new RegisterationRequestModel();

  id:string;
  constructor(private userServices: UserService, private http: HttpClient, private userList: UserService,
    private router: Router,private route:ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.user = new User();
    this.userServices.getUserId(this.id).subscribe(data => {
      this.user = data;
      console.log(this.user);
    },error => console.log("Update Response Front Error!!"));

    this.userDataDetails = this.userServices.getUserDetails().subscribe(data => this.userDataDetails = data);

    this.department = this.userServices.getDepartment().subscribe(data => this.department = data);
       this.department = this.userServices.getDepartment(); 
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
  doUpdate() {
    this.userServices.updateUser(this.id , this.user)
      .subscribe(data => console.log(data), error => console.log(error));
    this.user = new User();
    this.router.navigate(['admin/user-details']);
  }

  }