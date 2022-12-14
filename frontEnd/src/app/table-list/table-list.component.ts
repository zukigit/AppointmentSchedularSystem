import { Component, OnInit } from '@angular/core';
import { User } from 'app/user';
import { UserService } from 'app/user.service';
import { error } from 'console';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  userlist: any;

  users:User = new User();

  constructor(private userServices: UserService, private http:HttpClient,
    private router:Router, private list:UserService) { }

  ngOnInit() {
    this.department = this.list.department();
    console.log(this.department);
  }
  department:any[];
  team:any[];

   onSelect(department){
  //   console.log(department.target.value);
    this.team = this.list.team().filter(e=>e.department_id == department.target.value);
    console.log(this.team);
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
  console.log(this.users);
  this.userServices.createUser(this.users).subscribe(
    data => {this.router.navigate(['/user-details'])},
    error => alert("something wrong")
  )


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
