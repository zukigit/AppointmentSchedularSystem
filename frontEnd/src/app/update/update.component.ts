import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user';
import { UserService } from 'app/services/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RegisterationRequestModel } from 'app/model/registeration-request-model';
import { Team } from 'app/model/team';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  userData: any = [];
  department: any = [];
  teamArray: Team[];
  tempTeam: Team[];
  team: Team = new Team();
  user: User = new User();
  temTeam:string = "";
  temTeamId:string = "";
  registerModel: RegisterationRequestModel = new RegisterationRequestModel();
  id: string;
  constructor(private userServices: UserService, private router: Router, private route: ActivatedRoute) {
  }

  loginRole:string;
  show:boolean=false;
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userServices.getUserById(this.id).subscribe(data => {
      this.loginRole = data.role;
      console.log("Roleee " + this.loginRole)
      if (this.loginRole=='ADMIN'){
        this.show=true;
      }
      this.user = data;
      this.temTeam = data.team_name;
      this.temTeamId = data.team_id;
    }, error => console.log("Update Response Front Error!!"));

    this.department = this.userServices.getDepartment().subscribe(data => this.department = data);

    this.userServices.getTeam().subscribe(
      {
        next: (data) => {
          this.teamArray = data;
        }
      }
    )
  }

  onSelect(department) {
    this.tempTeam = this.teamArray.filter(e => {
      return e.department.department_id == department.target.value
    });
  }
  doUpdate() {
    if(this.temTeam == this.user.team_name){
      this.team.team_id = this.temTeamId;
    } else {
      this.team.team_id = this.user.team_name;
    }
    this.registerModel.employee_id = this.user.employee_id;
    this.registerModel.name = this.user.name;

    if (this.user.password == null) {
      this.registerModel.password = "";
      
    } else {
      this.registerModel.password = this.user.password;
    }
    this.registerModel.phone_number = this.user.phone_number;
    this.registerModel.gender = this.user.gender;
    this.registerModel.role = this.user.role;
    this.registerModel.position = this.user.position;
    this.registerModel.team = this.team;
    this.registerModel.userImage = this.user.userImage;
    this.userServices.updateUser(this.id, this.registerModel).subscribe ( data => {
      Swal.fire({  
        icon: 'success',  
        title: 'Successfully Updated',  
        text: 'Updating Employee Information is successed',   
      })
      this.goToUserDetails();
    },error => Swal.fire({  
      icon: 'error',  
      title: 'Failed Updated',  
      text: 'Updating Employee Information is failed',   
    }) )
  }

  goToUserDetails() {
    this.router.navigate(['admin/user-details']);
  }
}
