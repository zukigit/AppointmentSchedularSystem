import { Component, ChangeDetectorRef, OnInit, ViewChild, VERSION, ElementRef } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Router } from '@angular/router';
import { FixedScaleAxis } from 'chartist';
import { User } from 'app/model/user';
import { UserService } from 'app/services/user.service';
import { AppointmentService } from 'app/services/appointment.service';
import { ShowAppointment } from 'app/model/show-appointment';
//import { INITIAL_EVENTS, createEventId } from './event-utils';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weeklyviewbyuser',
  templateUrl: './weeklyviewbyuser.component.html',
  styleUrls: ['./weeklyviewbyuser.component.scss']
})
export class WeeklyviewbyuserComponent implements OnInit {

  startDate = new Date();
  loginId: string;
  user!: User;
  isLoad: boolean = false;
  userDataDetails: any;
  userSearch: any;
  searchedApp: ShowAppointment[];
  searchedUser: User = new User();
  searchedUserId: string;
  searchedUserName: string;
  calEvent: any[] = [];

  show: boolean = true;

  showApp: ShowAppointment[];
  Events: any[] = []
  currentDate:Date = new Date()
  eventClickDate:any;

  constructor(private changeDetector: ChangeDetectorRef,private datePipe: DatePipe, private router: Router, private userService: UserService, private appService: AppointmentService) {
    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridDay,timeLineWeek'
    }
  };
  header: any;
  calendarVisible = true;


  @ViewChild('calendar', { static: true }) calendar: ElementRef<any>;
  @ViewChild('calendar2', { static: true }) calendar2: ElementRef<any>;

  name = 'Angular ' + VERSION.major;


  ngOnInit() {
    this.isLoad = true;
    this.loginId = localStorage.getItem("loggedInUserId");
    this.user = new User();
    this.userService.getUserById(this.loginId)
      .subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (e) => console.log("profile error")
      })

    this.userDataDetails = this.userService.getUserDetails().subscribe(data => this.userDataDetails = data);


    var calendarEl = this.calendar.nativeElement;

    setTimeout(() => {
      this.appService.getAppointmentById(this.loginId).subscribe(
        (res: any) => {
          this.showApp = res;
          for (let result of this.showApp) {
            for (let r of result.schedules) {

              console.log("date " + r.date)
              // console.log("time " + result.start_ti)

              let dateStr: string = r.date + " " + r.start_time + ":00";
              let myDate = new Date(dateStr);

              let dateStr2: string = r.date + " " + r.end_time + ":00";
              let myDate2 = new Date(dateStr2);
              //myDate.setHours(result.start_date.getHours());

              if (myDate<= this.currentDate) {
                //alert("Schedule are finished,can't edit!!!");
                this.Events.push({ title: result.title, start: myDate, end: myDate2, id: result.appointment_id, groupId: result.type,color:"#6e6b6c" })
              } else {
                this.Events.push({ title: result.title, start: myDate, end: myDate2, id: result.appointment_id, groupId: result.type, })
              }

            }
            console.log("sch " + result.schedules)

          }

          console.log(this.Events);
        }

      )
    }, 1000);


    setTimeout(() => {
      var calendar = new Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        plugins: [timeGridPlugin],
        // customButtons: {
        //   myCustomButton: {
        //     text: 'Add Appointment',
        //     click: function() {
        //       alert('clicked the custom button!');
        //     }
        //   }
        // },
        views: {
          timeGridWeek: {
            type: 'timeGridWeek',
            slotDuration: '24:00:00',
            weekends: false,
            slotMinTime: "07:00:00",
            slotMaxTime: "20:00:00",
            selectable: true,
            select: this.handleDateSelect.bind(this),
            allDaySlot: false,
            contentHeight: 180,
            eventShortHeight: 100,
            eventMinHeight: 30,
            expandRows: true,
          }
        },
        events: this.Events,

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
            this.router.navigate(['/user/appointment_detail_view_byuser', id], { queryParams: { data: JSON.stringify(start)}});
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
    }, 1200);
  }

  //search
  afterClick() {
    this.calEvent = [];
   }
 
  searchAppByUserId(userId: string) {
    this.isLoad = true;
    this.userService.getUserById(userId).subscribe(
      (data: any) => {
        if (data != null) {
          this.searchedUser = data;
          var calendarEl2 = this.calendar2.nativeElement;
          setTimeout(() => {
            var calendar2 = new Calendar(calendarEl2, {
              initialView: 'timeGridWeek',
              plugins: [timeGridPlugin],
              views: {
                timeGridWeek: {
                  type: 'timeGridWeek',
                  slotDuration: '24:00:00',
                  weekends: false,
                  slotMinTime: "07:00:00",
                  slotMaxTime: "20:00:00",
                  selectable: true,
                  select: this.handleDateSelect.bind(this),
                  allDaySlot: false,
                  contentHeight: 180,
                  eventShortHeight: 100,
                  eventMinHeight: 30,
                  expandRows: true,
                }
              },

             events:this.calEvent,
              
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
            this.router.navigate(['/user/appointment_detail_view_byuser', id], { queryParams: { data: JSON.stringify(start)}});
          }
        },

              headerToolbar: {
                left: 'title',
                center: '',
                right: 'today prev,next',
              },

            });
            calendar2.render();
            this.searchedUserName = this.searchedUser.name;
            this.isLoad = false;
          }, 1500);

          setTimeout(() => {
            this.appService.getAppointmentById(userId).subscribe(
              (appData: any) => {
                if (appData == null) {
                  alert("this user has no appointments")
                } else {
                  this.searchedApp = appData;
                  for (let result of this.searchedApp) {
                    for (let r of result.schedules) {

                      console.log("date " + r.date)
                      // console.log("time " + result.start_ti)

                      let dateStr: string = r.date + " " + r.start_time + ":00";
                      let myDate = new Date(dateStr);

                      let dateStr2: string = r.date + " " + r.end_time + ":00";
                      let myDate2 = new Date(dateStr2);
                      //myDate.setHours(result.start_date.getHours());
                      console.log("title searc is " + myDate)

                      if (myDate <= this.currentDate) {
                        //alert("Schedule are finished,can't edit!!!");
                        this.calEvent.push({ title: result.title, start: myDate, end: myDate2, id: result.appointment_id, groupId: result.type,color:"#6e6b6c" })
                      } else {
                        this.calEvent.push({ title: result.title, start: myDate, end: myDate2, id: result.appointment_id, groupId: result.type, })
                      }


                    }

                  }
                  //  console.log("search event is " + this.calEvent)


                }
                console.log(this.calEvent);
              }


            )

          }, 1000);
        } else {
          this.searchedUser = new User();
          this.searchedUser.name = "";
          // alert("user not exist");
          Swal.fire({  
            icon: 'error',  
            title: 'Not Exist',  
            text: 'User not exist',   
          }) 
          this.isLoad = false;
        }
      }, error => {
        // alert("user doesn't exist")
        Swal.fire({  
          icon: 'error',  
          title: 'Not Exist',  
          text: 'User not exist',   
        }) 
        this.isLoad = false;
      }
    );
    this.afterClick()

  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.router.navigate(['app-register'])
  }

  goToAppRegister() {
    this.router.navigate(['/app-register'])
  }


  Search() {
    this.userDataDetails = this.userDataDetails.filter(res => {
      return res.name.toLocaleLowerCase().match(this.userSearch.toLocalLowerCase())
    })
  }
  goToSearchUser(){
    this.router.navigate(['user/search-user'])
  }

}

