import { Component, OnInit } from '@angular/core';
import { aN } from '@fullcalendar/core/internal-common';
import { Team } from 'app/model/team';
import { User } from 'app/model/user';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-app-register',
  templateUrl: './app-register.component.html',
  styleUrls: ['./app-register.component.scss']
})
export class AppRegisterComponent implements OnInit {

  sDate: any;
  eDate: any;

  sTime:any;
  eTime:any;

  department: any = [];
  team : any =[];
  user : any =[];

  teamArray: Team[];
  tempTeam: Team[];

  tempUser : User[];
  userArray : any =[];
  AssignDevice : any =[];
  UnassignDevice : any =[];

  constructor(private userServices : UserService) { }

  ngOnInit(): void {
    

    this.department = this.userServices.getDepartment().subscribe(data => this.department= data);

    this.userServices.getTeam().subscribe(
      {
        next: (data) => {
          this.team = data;
        }
      });

    this.userServices.getUserDetails().subscribe(
      {
        next : (data)=>{
          this.user = data;
        }
      } 
    )

  }

  
  onSelectDept(department){
	
    this.tempTeam = this.team.filter(e => {
       return e.department.department_id == department.target.value
     });
 
 }
 
 onSelectTeam(team){ 
 this.AssignDevice= this.user.filter(f => {
   return f.team_id == team.target.value 
 });
 console.log(this.AssignDevice);
 this.doReset(); 
 }


  addAppointment() {
    this.sDate = new Date(this.sDate);
    this.eDate = new Date(this.eDate);
    function getDataForDate(date) {
      return `Data for ${date.toISOString().slice(0, 10)}`;
    }
    while (this.sDate <= this.eDate) {
      const data = getDataForDate(this.sDate);
      console.log(data);
      this.sDate.setDate(this.sDate.getDate() + 1);
    }

    console.log("time is " + this.sTime)
  }

  name = 'Angular';
  private sourceDevice: AssignedDeviceCode[] = [];
      private confirmedDevice: Array<any>;
      //AssignDevice: AssignedDeviceCode[] = [];
      //UnassignDevice: UnAssignedDeviceCode[] = [];
      tab = 1;
      keepSorted = true;
      key: string;
      display: string;
      filter = false;
      source: AssignedDeviceCode[] = [];
      confirmed: UnAssignedDeviceCode[] = [];
      userAdd = '';
      disabled = false;
      sourceLeft = true;
     
      format: any = { add: 'Remove Device from User', remove: 'Assign Device To User', all: 'Select All', none: 'Unselect All', direction: 'left-to-right', draggable: true, locale: undefined };

    doReset() {
           this.sourceDevice = JSON.parse(JSON.stringify(this.AssignDevice));
           this.confirmedDevice = JSON.parse(JSON.stringify(this.UnassignDevice));
          console.log(this.confirmedDevice);
          this.populateList();
      }

      private populateList() {
          this.key = 'employee_id';
          this.display = 'name';
          this.keepSorted = true;
          this.source = this.AssignDevice;
          this.confirmed = this.confirmedDevice;
          console.log("source: " + JSON.stringify(this.source));
          console.log("confirmed: " + JSON.stringify(this.confirmed));
      }

      private showLabel(item: any) {
          return item.deviceCode;
      }

  }


  export class AssignedDeviceCode {
      public DeviceCode: number;
  }
  export class UnAssignedDeviceCode {
      public DeviceCode: number;
  }
