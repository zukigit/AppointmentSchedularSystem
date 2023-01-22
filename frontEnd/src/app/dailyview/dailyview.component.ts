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

import { data, error, event } from 'jquery';
import { info } from 'console';

//import { INITIAL_EVENTS, createEventId } from './event-utils';

@Component({
  selector: 'app-dailyview',
  templateUrl: './dailyview.component.html',
  styleUrls: ['./dailyview.component.css']
})
export class DailyviewComponent implements OnInit {
  Events: any[] = [];
  Events2: any[] = [];
  startDate = new Date();
  loginId: string;
  user!: User;
  showUser: boolean = false;
  view: boolean = true;

  showApp: ShowAppointment[];
  searchedApp: ShowAppointment[];
  searchedUser: User = new User();
  searchedUserId: string;


  constructor(private changeDetector: ChangeDetectorRef, private router: Router, private userService: UserService, private appService: AppointmentService) {

  };
  header: any;
  calendarVisible = false;

  @ViewChild('calendar', { static: true }) calendar: ElementRef<any>;
  @ViewChild('calendar2', { static: true }) calendar2: ElementRef<any>;

  name = 'Angular ' + VERSION.major;


  ngOnInit() {
    this.loginId = localStorage.getItem("loggedInUserId");

    //getAppointment
    this.getAppointment();

    var calendarEl = this.calendar.nativeElement;
    var calendarEl2 = this.calendar2.nativeElement;

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

              this.Events.push({ title: result.title, start: myDate, end: myDate2, id: result.appointment_id,groupId:result.type })

            }
            console.log("sch " + result.schedules)

          }

          console.log(this.Events);
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
        // events: [
        //   {
        //     title: "showTitle",
        //     start:new Date(),
        //     end:new Date()
        //   },


        //   {
        //     title: 'Meeting',
        //     start: '2023-01-16',
        //     end: '2023-01-16',
        //   },


        //  ],

        eventClick: (arg) => {
          let id = arg.event.id;
          let appType = arg.event.groupId;
          
          if(appType != "PUBLIC") {
            this.appService.checkUserInclude(this.loginId, Number(id)).subscribe(
              (data : any) => {
                if(data) {
                  this.router.navigate(['/view_only_appointment',id]);
                }
              }, error => {
                alert("this appointment is private and you are not in there")
              }
            );
          } else {
            this.router.navigate(['/view_only_appointment',id])
          }
        },

        headerToolbar: {
          left: 'title',
          center: '',
          right: 'today prev,next',
        },

      });
      calendar.render();

    }, 1500);



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

      events: [

        {
          title: 'Meeting',
          start: '2023-01-11T18:40:00',
          end: '2023-01-12T18:50:00',
        },


      ],
      headerToolbar: {
        left: 'title',
        center: '',
        right: 'today prev,next',
      },



    });
    calendar2.render();


  }


  searchAppByUserId(userId: string) {
    this.userService.getUserById(userId).subscribe(
      (data: any) => {
        if (data != null) {
          this.searchedUser = data;
          this.appService.getAppointmentById(userId).subscribe(
            (appData: any) => {
              if (appData == null) {
                alert("this user has no appointments")
              } else {
                this.searchedApp = appData;
              }
            }, error => {
              console.log("appointment search error")
            }
          )
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
    this.router.navigate(['app-register'])
  }

  toggleTag() {
    this.showUser = !this.showUser;
    this.view = !this.view;
  }


  goToAppRegister() {
    this.router.navigate(['/app-register'])
  }
  getAppointment() {

  }
}