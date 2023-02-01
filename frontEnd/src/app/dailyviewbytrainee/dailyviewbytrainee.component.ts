import { Component, ChangeDetectorRef, OnInit, ViewChild, VERSION, ElementRef } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin, { ThirdPartyDraggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Router } from '@angular/router';
import { FixedScaleAxis } from 'chartist';
import { User } from 'app/model/user';
import { UserService } from 'app/services/user.service';
import { AppointmentService } from 'app/services/appointment.service';
import { ShowAppointment } from 'app/model/show-appointment';
import { resolveSoa } from 'dns';
import { Schdule } from 'app/model/schdule';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-dailyviewbytrainee',
  templateUrl: './dailyviewbytrainee.component.html',
  styleUrls: ['./dailyviewbytrainee.component.scss']
})
export class DailyviewbytraineeComponent implements OnInit {
  Events: any[] = [];
  calEvent: any[] = [];
  startDate = new Date();
  loginId: string;
  showUser: boolean = false;
  view: boolean = true;
  showApp: ShowAppointment[];
  searchedApp: ShowAppointment[];
  searchedUser: User = new User();
  searchedUserName: string = "";
  searchedUserId: string;
  loginUser: User;
  currentDate: Date = new Date();
  eventClickDate:any;



  constructor(private datePipe: DatePipe, private changeDetector: ChangeDetectorRef, private router: Router, private userService: UserService, private appService: AppointmentService) {

  };
  header: any;
  calendarVisible = false;
  isLoad: boolean = false;

  @ViewChild('calendar', { static: true }) calendar: ElementRef<any>;
  @ViewChild('calendar2', { static: true }) calendar2: ElementRef<any>;

  name = 'Angular ' + VERSION.major;
  cal: any;


  ngOnInit() {
    this.isLoad = true;
    this.loginId = localStorage.getItem("loggedInUserId");
    var calendarEl = this.calendar.nativeElement;

    this.userService.getUserById(this.loginId).subscribe(
      (data) => {
        if(data != null || data != undefined) {
          this.loginUser = data;
        }
      }
    )

    setTimeout(() => {
      this.appService.getAppointmentById(this.loginId).subscribe(
        (res: any) => {
          this.showApp = res;
          for (let result of this.showApp) {
            for (let r of result.schedules) {
              let dateStr: string = r.date + " " + r.start_time + ":00";
              let myDate = new Date(dateStr);

              let dateStr2: string = r.date + " " + r.end_time + ":00";
              let myDate2 = new Date(dateStr2);
              if (myDate <= this.currentDate) {
                //alert("Schedule are finished,can't edit!!!");
                this.Events.push({ title: result.title, start: myDate, end: myDate2, id: result.appointment_id, groupId: result.type,color:"#6e6b6c" })
              } else {
                this.Events.push({ title: result.title, start: myDate, end: myDate2, id: result.appointment_id, groupId: result.type, })
              }
             
            }
          }
        }
      )
    }, 1000);


    setTimeout(() => {
      var calendar = new Calendar(calendarEl, {
        initialView: 'timeGridDay',
        plugins: [timeGridPlugin],
        views: {
          timeGridDay: {
            type: 'timeGridDay',
            allDaySlot: false,
            slotMinTime: "07:00:00",
            slotMaxTime: "20:00:00",
            contentHeight: 550,
            selectable: true,
            slotLabelFormat: { hour: 'numeric', minute: '2-digit', hour12: false },
            theme: true,
          }
        },
        events: this.Events,

        eventClick: (arg) => {
          let id = arg.event.id;
          let appType = arg.event.groupId;
          let start = this.datePipe.transform(arg.event.start, 'MM/dd/yyyy');

          if (appType != "PUBLIC") {
            this.appService.checkUserInclude(this.loginId, Number(id)).subscribe(
              (data: any) => {
                if (data) {
                  this.router.navigate(['/trainee/appointment_detail_view_bytrainee', id], { queryParams: { data: JSON.stringify(start)}});
                }
              }, error => {
                Swal.fire({  
                  icon: 'error',  
                  title: 'Assess Denied',  
                  text: 'This appointment is private and you are not in there',   
                }) 
                //alert("this appointment is private and you are not in there")
              }
            );
          } else {
            if (arg.event.start <= this.currentDate) {
              //alert("Schedule are finished,can't edit!!!");
              Swal.fire({  
                icon: 'error',  
                title: 'Assess Denied',  
                text: 'Appointment is over, Can not edit!!!',   
              }) 
            } else {
              this.router.navigate(['/trainee/appointment_detail_view_bytrainee', id], { queryParams: { data: JSON.stringify(start)}});
            }

            //this.router.navigate(['/view_only_appointment',id])
          }
        },

        headerToolbar: {
          left: 'title',
          center: '',
          right: 'today prev,next',
        },

      });
      calendar.render();
      this.isLoad = false;
    }, 1500);

    console.log("222222 " + this.Events);

  }

  beforeClick() {
   
  }

  afterClick() {
   this.calEvent = [];
  }



  searchAppByUserId(userId: string) {
   
    if(userId ==null){
      Swal.fire({  
        title: 'No ID Insert',  
        text: 'Please Inter Employee ID',   
      }) 
    }else{
      this.isLoad = true;
      this.userService.getUserById(userId).subscribe(
        (data: any) => {
          if (data != null) {
            this.searchedUser = data;
            var calendarEl2 = this.calendar2.nativeElement;
            setTimeout(() => {
              var calendar2 = new Calendar(calendarEl2, {
                initialView: 'timeGridDay',
                plugins: [timeGridPlugin],
                views: {
                  timeGridDay: {
                    type: 'timeGridDay',
                    allDaySlot: false,
                    slotMinTime: "07:00:00",
                    slotMaxTime: "20:00:00",
                    contentHeight: 550,
                    selectable: true,
                    slotLabelFormat: { hour: 'numeric', minute: '2-digit', hour12: false }
                  }
                },
                events: this.calEvent,
  
                eventClick: (arg) => {
                  let id = arg.event.id;
                  let appType = arg.event.groupId;
                  let start = this.datePipe.transform(arg.event.start, 'MM/dd/yyyy');
                  if (arg.event.start <= this.currentDate) {
                    Swal.fire({  
                      icon: 'error',  
                      title: 'Assess Denied',  
                      text: 'Appointment is over. Can not edit!!!',   
                    }) 
                  } else {
                    this.router.navigate(['/trainee/appointment_detail_view_bytrainee', id], { queryParams: { data: JSON.stringify(start)}});
                  }
  
                  // if (appType != "PUBLIC") {
                  //   this.appService.checkUserInclude(this.loginId, Number(id)).subscribe(
                  //     (data: any) => {
                  //       if (data) {
                  //         this.router.navigate(['/admin/appointment_detail_view', id], { queryParams: { data: JSON.stringify(start)}});
                  //       }
                  //     }, error => {
                  //       //alert("this appointment is private and you are not in there")
                  //       Swal.fire({  
                  //         icon: 'error',  
                  //         title: 'Assess Denied',  
                  //         text: 'This appointment is private and you are not in there.',   
                  //       }) 
                  //     }
                  //   );
                  // } else {
                    // if (arg.event.end <= this.currentDate) {
                    //   //alert("Schedule are finished,can't edit!!!");
                    //   Swal.fire({  
                    //     icon: 'error',  
                    //     title: 'Assess Denied',  
                    //     text: 'Appointment is over. Can not edit!!!',   
                    //   }) 
                    // } else {
                    //   this.router.navigate(['/admin/appointment_detail_view', id], { queryParams: { data: JSON.stringify(start)}});
                    // }
                  // }
                },
              });
              calendar2.render()
              this.searchedUserName = this.searchedUser.name;
              this.isLoad = false;
            }, 1500);
  
            setTimeout(() => {
              this.appService.getAppointmentById(userId).subscribe(
                (appData: any) => {
                  if (appData == null) {
                    // alert("this user has no appointments");
                    Swal.fire({  
                      icon: 'error',  
                      title: 'No Appointment',  
                      text: 'This user has no appointment.',   
                    })
                  } else {
                    this.searchedApp = appData;
                    for (let result of this.searchedApp) {
                      for (let r of result.schedules) {
                        console.log("date " + r.date)
                        let dateStr: string = r.date + " " + r.start_time + ":00";
                        let myDate = new Date(dateStr);
                        let dateStr2: string = r.date + " " + r.end_time + ":00";
                        let myDate2 = new Date(dateStr2);
                        console.log("title searc is " + myDate);
                        if (myDate <= this.currentDate) {
                          //alert("Schedule are finished,can't edit!!!");
                          this.calEvent.push({ title: result.title, start: myDate, end: myDate2, id: result.appointment_id, groupId: result.type,color:"#6e6b6c" })
                        } else {
                          this.calEvent.push({ title: result.title, start: myDate, end: myDate2, id: result.appointment_id, groupId: result.type, })
                        }
                        
                      }
                    }
                
                  }
                  console.log(this.calEvent);
                }
              )
  
            }, 1000);
          } else {
            this.searchedUser = new User();
            this.searchedUser.name = "";
            //alert("user not exist");
            Swal.fire({  
              icon: 'error',  
              title: 'No User',  
              text: 'User does not exist',   
            })
            this.isLoad = false;
          }
        }, error => {
          // alert("user doesn't exist");
          Swal.fire({  
            icon: 'error',  
            title: 'No User',  
            text: 'User does not exist',   
          })
          this.isLoad = false;
        }
      );

    }
   
    this.afterClick()
    

  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.router.navigate(['app-register'])
  }

  toggleTag() {
    this.showUser = !this.showUser;
    this.view = !this.view;
  }


  // goToAppRegister() {
  //   this.router.navigate(['/admin/app-register'])
  // }

  goToSearchUser(){
    this.router.navigate(['trainee/search-user'])
  }
}



  // goToAppRegister() {
  //   this.router.navigate(['/admin/app-register'])
  // }
  
function beforeClick() {
  throw new Error('Function not implemented.');
}


