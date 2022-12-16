import { Component, OnInit } from '@angular/core';
import { User } from 'app/user';
import { UserService } from 'app/user.service';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { data } from 'jquery';
import * as e from 'express';
import { filter } from 'rxjs';

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
   team:any=[];

  user:User = new User();

  constructor(private userServices: UserService, private http:HttpClient,private userList : UserService,
    private router:Router) { }

  ngOnInit() {

     this.department = this.userServices.getDepartment().subscribe(data=>this.department=data);
 //    this.department = this.userServices.getDepartment();    
    
     this.team = this.userServices.getTeam().subscribe(data=>this.team=data); 

     this.userDetails= this.userServices.getUserList();

  }

    onSelect(department){ 

 //     this.team=this.userServices.getTeam().filter(e=> e.department_id = department.target.value);
      
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

//  getUsers() {
//   this.userData = this.userlist.getDepartment().subscribe(data=>this.department=data);
//   this.userData = this.userlist.getTeam().subscribe(data=> this.team=data);
//   this.userData = this.userlist.getUserList(this.userServices);
// }

}
