import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { aN, H, m } from '@fullcalendar/core/internal-common';
import { AppointmentRegister } from 'app/model/appointment-register';
import { Schdule } from 'app/model/schdule';
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
  app: AppointmentRegister = new AppointmentRegister()
  schedule: Schdule;
  currentDate:any = new Date();
  sDate:any = new Date(this.app.start_date)
  startDate() {
   this.sDate = new Date(this.app.start_date)
  }
  

  loginId = localStorage.getItem("loggedInUserId")

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

  title: 'datePicker';

  startHour : string;
  startMinute : string;

  endHour : string;
  endMinute : string;

  constructor(private userServices: UserService, private datePipe: DatePipe, private appService: AppointmentService) { }

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
  private confirmedUsers: Array<any>;
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
  files:File[] = [];
  convertedFiles:FormData[] = [];

  format: any = { add: 'Add Selected Member', remove: 'Remove Selected Member', all: 'Select All', none: 'Unselect All', direction: 'right-to-left', draggable: true, locale: undefined };


  private populateList() {
    this.key = 'employee_id';
    this.display = 'name';
    this.keepSorted = true;
    this.source = this.AssignDevice;
    this.confirmedUsers = this.UnassignDevice;
    this.confirmed = this.confirmedUsers;
    console.log("source: " + JSON.stringify(this.source));
    console.log("confirmed: " + JSON.stringify(this.confirmed));
  }

  doReset() {
  
    this.sourceDevice = JSON.parse(JSON.stringify(this.AssignDevice));
    this.confirmedUsers = JSON.parse(JSON.stringify(this.UnassignDevice));
    localStorage.setItem("listbox", this.confirmedUsers.forEach.toString())
    console.log(this.confirmedUsers);
    this.populateList();
  
  }


  private showLabel(item: any) {
    return item.deviceCode;
  }
  schedules: Schdule[] = [];
  addAppointment() {
    this.app.start_date = new Date(this.app.start_date);
    this.app.end_date = new Date(this.app.end_date);
    
    console.log("start hour"+this.startHour);

    console.log("end hour"+this.endHour);


    for (let d = this.app.start_date; d <= this.app.end_date; d.setDate(d.getDate() + 1)) {
      
      this.schedule = new Schdule()
      this.schedule.date = this.datePipe.transform(d, 'dd/MM/yyyy');
      this.app.start_time = this.startHour+ ":"+this.startMinute;
      this.app.end_time = this.endHour +":"+ this.endMinute;
      this.schedule.start_time = this.app.start_time
      this.schedule.end_time = this.app.end_time
      console.log("time " + this.app.start_time)
      this.schedules.push(this.schedule)
      
      console.log("starttime is " + this.schedule.start_time);
      console.log("end time is " + this.schedule.end_time);
    }
    this.app.schedules = this.schedules
    console.log("Sche " + this.app.schedules)
    this.app.employee = this.confirmedUsers;
    this.app.createUser = {"employee_id" : this.loginId}

    this.appService.createAppointment(this.app).subscribe(
      data => console.log("Ok na sarrrrrr"),
      error => console.log("Error appointment responseee ")
    )
  }

  addFiles(event) {
    this.files = event.target.files;
  }

  convertToFormdata(){
    for(let i = 0; i < this.files.length; i++){
      const formData = new FormData();
      formData.append("file", this.files[i])
      this.convertedFiles.push(formData);
    }
    console.log("converted files" + this.convertedFiles.length)
  }
}


export class AssignedDeviceCode {
  public DeviceCode: number;
}
export class UnAssignedDeviceCode {
  public DeviceCode: number;
}
