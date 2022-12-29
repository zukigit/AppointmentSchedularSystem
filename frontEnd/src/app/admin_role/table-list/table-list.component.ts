import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user';
import { UserService } from 'app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { RegisterationRequestModel } from 'app/model/registeration-request-model';
import { Team } from 'app/model/team';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Search } from 'app/model/search';


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  userData: any = [];
  userDetails: any = [];

  userDataDetails: any = [];
  userlist: any = [];

  afterSearch : any = [];

  department: any = [];
  teamArray: Team[];
  tempTeam: Team[];
  team: Team = new Team();

  userSearch: any = [];
  adminId: string;
  search:Search = new Search();

  user: User = new User();
  registerModel: RegisterationRequestModel = new RegisterationRequestModel();
  
  searchOption:string = "";

  constructor(private userServices: UserService, private http: HttpClient, private userList: UserService,
    private router: Router) {
  }

  ngOnInit() {

   this.getUserDetails();
  }
  getUserDetails() {
    this.userDataDetails = this.userServices.getUserDetails().subscribe(data => this.userDataDetails = data);
  }

  onSelect(type) {
    this.searchOption = type.target.value;
  }


  updateUser(id: string) {
    this.router.navigate(['admin/updateuser', id])
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
    this.userServices.createUser(this.registerModel).subscribe(data => {
      this.router.navigate(['admin/user-details']);
      console.log("Successfully");
    }
    );

  }

  SearchUser() {
    if(this.searchOption == "") {
      this.searchOption = "default";
    }
    if(this.searchOption == "default"){
      if (this.userSearch != "") {
        console.log("it's default");
        this.userDataDetails = this.userDataDetails.filter(res => {
          return res.name.toLocaleLowerCase().match(this.userSearch.toLocaleLowerCase());
        })
      }
      else if (this.userSearch == "") {
        this.ngOnInit();
      }
    } else if(this.searchOption == "searchByDepartment"){
      if (this.userSearch != "") {
        console.log("it's default");
        this.userDataDetails = this.userDataDetails.filter(res => {
          return res.department_name.toLocaleLowerCase().match(this.userSearch.toLocaleLowerCase());
        })
      }
      else if (this.userSearch == "") {
        this.ngOnInit();
      }
    } else {
      if (this.userSearch != "") {
        console.log("it's default");
        this.userDataDetails = this.userDataDetails.filter(res => {
          return res.team_name.toLocaleLowerCase().match(this.userSearch.toLocaleLowerCase());
        })
      }
      else if (this.userSearch == "") {
        this.ngOnInit();
      }
    }
  }

  deleteUser(id:string) {
    
      // confirm("Are you sure want to delete?")
      Swal.fire({  
        title: 'Are you sure want to delete?',  
        // text: 'You will not be able to recover this file!',  
        icon: 'warning',  
        showCancelButton: true, 
        cancelButtonText: 'No, keep it', 
        confirmButtonText: 'Yes, delete it!'  
          
      }).then((result) => {  
        if (result.value) {  
          this.userServices.deleteUser(id).subscribe(
            data => {this.getUserDetails(),
              Swal.fire({  
              icon: 'success',  
              title: 'Delete Success',  
              text: 'Your selected Employee is deleted',   
            }) 
            }
            ,error => Swal.fire({  
              icon: 'error',  
              title: 'Delete Failed',  
              text: 'Can not delete yourself',   
            }) 
            
          )
        } 
        // else if (result.dismiss === Swal.DismissReason.cancel) {  
        //   Swal.fire(  
        //     'Cancelled',  
        //     'Your selected Employee is safe :)',  
        //     'error'  
        //   )  
        // }  
      })
    
    
    
   
    
  }

}
