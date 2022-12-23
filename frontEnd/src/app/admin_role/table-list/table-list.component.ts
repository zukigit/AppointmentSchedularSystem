import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user';
import { UserService } from 'app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { RegisterationRequestModel } from 'app/model/registeration-request-model';
import { Team } from 'app/model/team';


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

  department: any = [];
  teamArray: Team[];
  tempTeam: Team[];
  team: Team = new Team();

  userSearch: any = [];
  adminId: string;

  user: User = new User();
  registerModel: RegisterationRequestModel = new RegisterationRequestModel();

  constructor(private userServices: UserService, private http: HttpClient, private userList: UserService,
    private router: Router) {
  }

  ngOnInit() {

   this.getUserDetails()

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
  getUserDetails() {
    this.userDataDetails = this.userServices.getUserDetails().subscribe(data => this.userDataDetails = data);
  }

  dataOfUser() {
    this.userDataDetails = this.userServices.getUserDetails().subscribe(data => this.userDataDetails(data));

  }

  onSelect(department) {
    this.tempTeam = this.teamArray.filter(e => {
      return e.department.department_id == department.target.value
    });
    console.log("teams length is" + this.teamArray.length);
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
    if (this.userSearch != "") {
      this.userDataDetails = this.userDataDetails.filter(res => {
        return res.name.toLocaleLowerCase().match(this.userSearch.toLocaleLowerCase());
      })
    }
    else if (this.userSearch == "") {
      this.ngOnInit();
    }

  }

  SearchDepartment() {
    if (this.userSearch != "") {
      this.userDataDetails = this.userDataDetails.filter(res => {
        return res.department_name.toLocaleLowerCase().match(this.userSearch.toLocaleLowerCase());
      })
    }
    else if (this.userSearch == "") {
      this.ngOnInit();
    }

  }

  SearchTeam() {
    if (this.userSearch != "") {
      this.userDataDetails = this.userDataDetails.filter(res => {
        return res.team_name.toLocaleLowerCase().match(this.userSearch.toLocaleLowerCase());
      })
    }
    else if (this.userSearch == "") {
      this.ngOnInit();
    }



    // SearchTeam(){
    //   if(this.userSearch != ""){
    //     this.userDataDetails = this.userDataDetails.filter(res=>{
    //       return res.team_name.toLocaleLowerCase().match(this.userSearch.toLocaleLowerCase());
    //     })
    //   }
    //   else if(this.userSearch == ""){
    //     this.ngOnInit(); 
    //   }
  }

  // deleteUser(id: string) {
  //   this.adminId = localStorage.getItem("loggedInUserId");
  //   console.log("Admin Id is " + this.adminId);
  //   if (id != this.adminId) {
  //       this.userServices.deleteUser(id).subscribe(data => {
  //       this.router.navigate(['admin/user-details']).then(()=>{
  //         window.location.reload();
  //       });
  //     })
  //   } else {
  //     alert("Can't delete ")
  //   }

  deleteUser(id:string) {
    if(confirm("Are you sure want to delete?"))
    this.userServices.deleteUser(id).subscribe(
      data => this.getUserDetails(),error => alert("Can't delete yourself")
    )
  }



}
