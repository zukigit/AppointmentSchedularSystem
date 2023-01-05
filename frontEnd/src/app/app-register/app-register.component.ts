import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { aN } from '@fullcalendar/core/internal-common';
import { AppointmentRegister } from 'app/model/appointment-register';
import { Team } from 'app/model/team';
import { User } from 'app/model/user';
import { AppointmentService } from 'app/services/appointment.service';
import { UserService } from 'app/services/user.service';
import { listenerCount } from 'process';

@Component({
  selector: 'app-app-register',
  templateUrl: './app-register.component.html',
  styleUrls: ['./app-register.component.scss']
})
export class AppRegisterComponent implements OnInit {


  department: any = [];
  team: any = [];
  user: any = [];

  startTime: string;
  endTime: string;

  teamArray: Team[];
  tempTeam: Team[];

  tempUser: User[];
  userArray: any = [];
  AssignDevice: any = [];
  UnassignDevice: any = [];

  title:'datePicker';
  currentDate : any = new Date();

  app: AppointmentRegister = new AppointmentRegister()

  constructor(private userServices: UserService, private datePipe: DatePipe,private appService:AppointmentService) { }

  ngOnInit(): void {


    this.department = this.userServices.getDepartment().subscribe(data => this.department = data);

    this.userServices.getTeam().subscribe(
      {
        next: (data) => {
          this.team = data;
        }
      });

    this.userServices.getUserDetails().subscribe(
      {
        next: (data) => {
          this.user = data;
        }
      }
    )

  }


  onSelectDept(department) {

    this.tempTeam = this.team.filter(e => {
      return e.department.department_id == department.target.value
    });

  }

  onSelectTeam(team) {
    this.AssignDevice = this.user.filter(f => {
      return f.team_id == team.target.value
    });
    console.log(this.AssignDevice);
    this.doReset();
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
    localStorage.setItem("listbox", this.confirmedDevice.forEach.toString())
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
  addAppointment() {
    this.app.sDate = new Date(this.app.sDate);
    this.app.eDate = new Date(this.app.eDate);
    this.app.listbox = this.confirmedDevice;

    // let list: string[] = [];

    // for (let result of this.confirmedDevice) {
    //   list.push(result.employee_id);
    //   console.log(list)
    // }
    console.log("sdate " + this.app.sDate)
    console.log("edate  " + this.app.eDate)
    console.log("stime" + this.app.sTime)
    console.log("etime " + this.app.eTime)
    console.log("description " + this.app.description)
    console.log("type " + this.app.type)

    this.appService.createAppointment(this.app).subscribe(
      data => console.log("Ok na sarrrrrr"),
      error => console.log("Error appointment responseee ")
    )
  }


}


export class AssignedDeviceCode {
  public DeviceCode: number;
}
export class UnAssignedDeviceCode {
  public DeviceCode: number;
}
