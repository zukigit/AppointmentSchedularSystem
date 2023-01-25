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


@Component({
  selector: 'app-dailyviewbyuser',
  templateUrl: './dailyviewbyuser.component.html',
  styleUrls: ['./dailyviewbyuser.component.scss']
})
export class DailyviewbyuserComponent implements OnInit {

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
  todayDate: Date = new Date("01/23/2023");



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
              this.Events.push({ title: result.title, start: myDate, end: myDate2, id: result.appointment_id, groupId: result.type, })
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
            slotLabelFormat: { hour: 'numeric', minute: '2-digit', hour12: false }
          }
        },
        events: this.Events,

        eventClick: (arg) => {
          let id = arg.event.id;
          let appType = arg.event.groupId;
          console.log("event click date is " + arg.event.end)
          console.log("current click date is " + this.currentDate)

          if (appType != "PUBLIC") {
            this.appService.checkUserInclude(this.loginId, Number(id)).subscribe(
              (data: any) => {
                if (data) {
                  this.router.navigate(['/user/appointment_detail_view', id]);
                }
              }, error => {
                alert("this appointment is private and you are not in there")
              }
            );
          } else {
            if (arg.event.end <= this.currentDate) {
              alert("Schedule are finished,can't edit!!!");
            } else {
              this.router.navigate(['/user/appointment_detail_view', id]);
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



  searchAppByUserId(userId: string) {
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

                if (appType != "PUBLIC") {
                  this.appService.checkUserInclude(this.loginId, Number(id)).subscribe(
                    (data: any) => {
                      if (data) {
                        this.router.navigate(['/user/appointment_detail_view', id]);
                      }
                    }, error => {
                      alert("this appointment is private and you are not in there")
                    }
                  );
                } else {
                  if (arg.event.end <= this.currentDate) {
                    alert("Schedule are finished,can't edit!!!");
                  } else {
                    this.router.navigate(['/user/appointment_detail_view', id]);
                  }
                  //this.router.navigate(['/view_only_appointment', id])
                }
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

                      this.calEvent.push({ title: result.title, start: myDate, end: myDate2, id: result.appointment_id, groupId: result.type })
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
          alert("user not exist")
        }
      }, error => {
        alert("user doesn't exist")
      }
    );

  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.router.navigate(['/user/app-register'])
  }

  toggleTag() {
    this.showUser = !this.showUser;
    this.view = !this.view;
  }


  goToAppRegister() {
    this.router.navigate(['/user/app-register'])
  }
}