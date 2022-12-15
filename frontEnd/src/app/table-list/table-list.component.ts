import { Component, OnInit } from '@angular/core';
import { User } from 'app/user';
import { UserService } from 'app/user.service';
import { error } from 'console';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { data } from 'jquery';
import * as e from 'express';
import { departmentList } from 'app/lists/departmentList';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  
  userData: User[];
   userlist: any=[];
   department:any=[];
   team:any=[];

  user:User = new User();

  constructor(private userServices: UserService, private http:HttpClient,private userList : UserService,
    private router:Router) { }

  ngOnInit() {
    this.getUsers();
    this.department=this.userServices.getDepartment().subscribe(data=>this.department=data);
    this.department = this.userlist.getDepartment();
 
     
  }

    private getUsers() {
      this.userServices.getAllData().subscribe(
        data=>{
        console.log(data),
        this.userData=data}
      )
    }


    onSelect(department){ 
      this.team=this.userServices.getTeam().subscribe(data=>this.team=data); 
      this.team = this.userlist.getTeam().filter(e=> e.department_id == department.target.value);
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
        this.userServices.createUser(this.user).subscribe(data => {this.router.navigate(['/user-details/'])}
  );

 } 

  // onSubmit( user:User ){
  //   this.userServices.doRegisteration(this.userlist).subscribe
  //   (
  //     data=>{
  //       this.userlist=data
  //     },
  //     error => console.log(error));
  // }

  // public doRegisteration(user: User) {
  //   console.log(this.users);
    
  //   return this.http.post("http://localhost:8080/api/register", user, { responseType: 'text' as 'json' })
  // }

 
}
