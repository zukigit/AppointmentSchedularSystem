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
//import { INITIAL_EVENTS, createEventId } from './event-utils';

@Component({
  selector: 'app-dailyview',
  templateUrl: './dailyview.component.html',
  styleUrls: ['./dailyview.component.css']
})
export class DailyviewComponent implements OnInit {
  Events: any[] =[{title:"event",date:new Date()}];
  startDate = new Date();
  loginId: string;
  user!: User;
  showUser: boolean = false;
  view: boolean = true;

  showApp: ShowAppointment[];



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
    console.log("Events is " + this.Events)
    for(let a of this.Events) {
     console.log("a is " +  a.title);
    }

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
        }
      },
      // events:this.Events,
      

      events: [
        {
          title: "showTitle",
          date:new Date().getTime()
        },


        {
          title: 'Meeting',
          start: '2023-01-16T16:40:00',
          end: '2023-01-16T18:50:00',
        },


      ],

      headerToolbar: {
        left: 'title',
        center: '',
        right: 'today prev,next',
      },
    });
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

        }
      },

      events: [



        {
          title: 'Meeting',
          start: '2023-01-11T18:40:00',
          end: '2023-01-11T18:50:00',
        },


      ],
      headerToolbar: {
        left: 'title',
        center: '',
        right: 'today prev,next',
      },

    });

    calendar.render();
    calendar2.render();
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
    this.appService.getAppointmentById(this.loginId).subscribe(
      data => {
        this.showApp = data;

        for (let result of this.showApp) {
         
        }

      }

    )
  }
}