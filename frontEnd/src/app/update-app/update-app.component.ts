import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentRegister } from 'app/model/appointment-register';
import { Schdule } from 'app/model/schdule';
import { Team } from 'app/model/team';
import { User } from 'app/model/user';
import { AppointmentService } from 'app/services/appointment.service';
import { UserService } from 'app/services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-update-app',
  templateUrl: './update-app.component.html',
  styleUrls: ['./update-app.component.scss']
})
export class UpdateAppComponent implements OnInit {

  app: AppointmentRegister = new AppointmentRegister()
  schedule: Schdule;
  currentDate: any = new Date();
  sDate: any = new Date()
  sTime: any = new Date();
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

  minutesOptions = [
    { value: '00', label: '00' },
    { value: '15', label: '15' },
    { value: '30', label: '30' },
    { value: '45', label: '45' }
  ]

  loginId = localStorage.getItem("loggedInUserId")

  department: any = [];
  team: any = [];
  user: any = [];
  showUserLength: string = "+ Avaliable Employee : " + `${this.user.length}`;
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

  temStartHour: string;
  temStartMinute: string;

  appUsers: any = []

  temEndHour: string;
  temEndMinute: string;
  id: string;
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
  files: File[] = [];
  schedules: Schdule[] = [];
  format: any = { add: 'Add Selected Member', remove: 'Remove Selected Member', all: 'Select All', none: 'Unselect All', direction: 'right-to-left', draggable: true, locale: undefined };

  constructor(private userServices: UserService, private route: ActivatedRoute, private datePipe: DatePipe, private appService: AppointmentService, private router: Router,) { }

  ngOnInit(): void {
    
    this.getAvaliables();
    this.alreadyIn();
    this.id = this.route.snapshot.params['id'];
    this.getAppDetails()
    this.department = this.userServices.getDepartment().subscribe(data => this.department = data);
    // this.alreadyIn();
    this.userServices.getTeam().subscribe(
      {
        next: (data) => {
          this.team = data;
        }
      });
  }

  getAppDetails(){
    this.appService.viewOnlyAppointmentById(this.id).subscribe(
      (res: any) => {
        this.app = res
        this.UnassignDevice = this.app.employee
        this.confirmedUsers = this.UnassignDevice
        this.doReset()
        this.getAvaliables();
      },
      error => console.log("get app error " + error));
  }

  alreadyIn() {
    this.appService.getAppointmentById(this.id).subscribe(
      data => this.UnassignDevice = data
    )
    console.log(this.UnassignDevice)
  }

  isOptionDisabled(value: string): boolean {
    if (this.startMinute === "45") {
      return this.startHour >= value
    }
    else {
      return this.startHour > value
    }
  }

  minuteDisable(value: string): boolean {
    if (this.startHour == this.endHour) {
      return this.startMinute >= value;
    }
    else {
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
    this.doReset();
  }

  doReset() {

    this.sourceDevice = JSON.parse(JSON.stringify(this.AssignDevice));
    this.confirmed = JSON.parse(JSON.stringify(this.UnassignDevice));
    localStorage.setItem("listbox", this.confirmedUsers.forEach.toString())
    console.log(this.confirmedUsers);
    this.populateList();

  }
  private populateList() {
    this.key = 'employee_id';
    this.display = 'name';
    this.keepSorted = true;
    this.confirmed = this.UnassignDevice;
    this.confirmedUsers = this.confirmed;
    this.source = [...this.AssignDevice, ...this.confirmed,...this.UnassignDevice];  
    
    console.log("populate lsit confirm user " + this.confirmedUsers)
    
    console.log("source: " + JSON.stringify(this.source));
    console.log("confirmed: " + JSON.stringify(this.confirmed));
  }

  

  //update
  updateAppointment() {
    this.app.employee = this.confirmedUsers;

    this.app.title = this.app.title
    this.app.description = this.app.description


    this.appService.updateApp(this.app).subscribe(
      data => {
        this.getAppDetails()
        alert("update success")
      },error=>console.log("error update")
      
    )
   }
  //date
  onSelect(event) {
    this.sDate = new Date(this.app.start_date)
  }

  checkFiles(event) {
    this.files = [];
    let checkFiles = event.target.files;
    let sizeLimit = 5000000; // 5MB
    for (let i = 0; i < checkFiles.length; i++) {
      if (checkFiles[i].size > sizeLimit) {
        // Display error message to user
        console.log("File too large: " + checkFiles[i].name);
        alert('File size should be less than 5MB!!');
      } else {
        this.files.push(checkFiles[i]);
      }
    }
  }

  uploadFiles(appointmentId: any) {
    const formdata = new FormData();
    formdata.append("appointmentId", appointmentId);
    for (let i = 0; i < this.files.length; i++) {
      formdata.append("files", this.files[i]);
    }
    this.appService.uploadFiles(formdata).subscribe(
      data => {
        // Swal.fire('Added Appointment!!', 'Appointment Added Succesfully!', 'success');
      },
      error => {
        Swal.fire('Failed!!', 'Appointment Added Was Failed!', 'fail');
      }
    );
  }

  removeFile(fileId:number) {
    console.log("remove file is called")
    for(let i = 0; i < this.app.files.length; i++) {
      if(this.app.files[i].file_id == fileId) {
        this.app.files.splice(i, 1);
      }
    }
  }

  getAvaliables() {
    this.userServices.getAvaliables(this.app.schedules).subscribe(
      {
        next: (data) => {
          this.user = data;
          // this.schedules.length = 0;
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


