import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppointmentRegister } from 'app/model/appointment-register';
import { Schdule } from 'app/model/schdule';
import { Team } from 'app/model/team';
import { User } from 'app/model/user';
import { AppointmentService } from 'app/services/appointment.service';
import { UserService } from 'app/services/user.service';
import { retry } from 'rxjs';


@Component({
  selector: 'app-app-register',
  templateUrl: './app-register.component.html',
  styleUrls: ['./app-register.component.scss']
})
export class AppRegisterComponent implements OnInit {
  app: AppointmentRegister = new AppointmentRegister()
  schedule: Schdule;
  currentDate: any = new Date();
  sDate: any = new Date()
  sTime:any = new Date()

  options = [
    { value: '07', label: '07' },
    { value: '08', label: '08' },
    { value: '09', label: '09' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
    { value: '14', label: '14' },
    { value: '15', label: '15' },
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
    { value: '19', label: '19' }, 
  ];

  minutesOptions =[ 
    { value: '00', label: '00' },
    { value: '15', label: '15' },
    { value: '30', label: '30' },
    { value: '45', label: '45' }
  ]

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

  startHour: string;
  startMinute: string;

  endHour: string;
  endMinute: string;

  name = 'Angular';
  private sourceDevice: AssignedDeviceCode[] = [];
  private confirmedUsers: Array<any>;
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
  schedules: Schdule[] = [];
  format: any = { add: 'Add Selected Member', remove: 'Remove Selected Member', all: 'Select All', none: 'Unselect All', direction: 'right-to-left', draggable: true, locale: undefined };
  constructor(private userServices: UserService, private datePipe: DatePipe, private appService: AppointmentService) { }

  ngOnInit(): void {

    this.department = this.userServices.getDepartment().subscribe(data => this.department = data);

    this.userServices.getTeam().subscribe(
      {
        next: (data) => {
          this.team = data;
        }
      });

    // this.userServices.getUserDetails().subscribe(
    //   {
    //     next: (data) => {
    //       this.user = data;
    //     }
    //   }
    // )
  }

  isOptionDisabled(value: string): boolean {   
    return this.startHour>value ;
  
  }

  onSelectHour(){
    
  }

  minuteDisable (value: string):boolean{
    if(this.startHour == this.endHour){
      return this.startMinute >= value;
    }
    else{
    return value != value;
  }
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
  addAppointment() {
    this.generateSchedules();
    this.app.created_date = this.datePipe.transform(this.currentDate, 'dd/MM/yyyy');
    this.app.schedules = this.schedules
    this.app.employee = this.confirmedUsers;
    this.app.createUser = {employee_id:this.loginId}

    this.appService.createAppointment(this.app).subscribe(
      data => console.log("Ok na sarrrrrr"),
      error => console.log("Error appointment responseee ")
    )
  }
  //date
  onSelect(event) {
    this.sDate = new Date(this.app.start_date)
    // do something with the selected text here
  }

  addFiles(event) {
    this.files = event.target.files;
    const formdata = new FormData();
    formdata.append("userId", this.loginId);
    for(let i = 0; i < this.files.length; i++) {
      formdata.append("files", this.files[i]);
    }
    this.appService.uploadFiles(formdata).subscribe(
      data=>console.log("Yes"),
      error=>console.log("No")
    );

    let files = event.target.files;
    let sizeLimit = 5000000; // 5MB
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > sizeLimit) {
          // Display error message to user
          console.log("File too large: " + files[i].name);
          // alert('File size should be less than 5MB!!');
      } else {
          // Handle valid file
          console.log("File is inserted: " + files[i].name);
          this.app.attached = event.target.files;
      }
    }
  }

  generateSchedules() {
    this.app.start_date = new Date(this.app.start_date);
    this.app.end_date = new Date(this.app.end_date);

    for (let d = this.app.start_date; d <= this.app.end_date; d.setDate(d.getDate() + 1)) {
      this.schedule = new Schdule();
      this.schedule.date = this.datePipe.transform(d, 'dd/MM/yyyy');
      this.app.start_time = this.startHour + ":" + this.startMinute;
      this.app.end_time = this.endHour + ":" + this.endMinute;
      this.schedule.start_time = this.app.start_time;
      this.schedule.end_time = this.app.end_time;
      this.schedules.push(this.schedule);
    }
  }

  getAvaliables() {
    this.user.length = 0;
    this.generateSchedules();
    this.userServices.getAvaliables(this.schedules).subscribe(
      {
        next: (data) => {
          this.user = data;
        }
      }
    );
  }
}
export class AssignedDeviceCode {
  public DeviceCode: number;
}
export class UnAssignedDeviceCode {
  public DeviceCode: number;
}
