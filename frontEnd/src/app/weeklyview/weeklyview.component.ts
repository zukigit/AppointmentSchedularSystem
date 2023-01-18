import { Component, ChangeDetectorRef, OnInit, ViewChild, VERSION, ElementRef } from '@angular/core';
import { Calendar} from '@fullcalendar/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Router } from '@angular/router';
import { FixedScaleAxis } from 'chartist';
import { User } from 'app/model/user';
import { UserService } from 'app/services/user.service';
//import { INITIAL_EVENTS, createEventId } from './event-utils';

@Component({
  selector: 'app-weeklyview',
  templateUrl: './weeklyview.component.html',
  styleUrls: ['./weeklyview.component.css']
})
export class WeeklyviewComponent implements OnInit {

  startDate = new Date();
  loginId : string;
  user!: User;

  userDataDetails : any;
  userSearch : any;

  show : boolean = true;

  constructor(private changeDetector: ChangeDetectorRef,private router:Router,private userService : UserService) {
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
  this.loginId = localStorage.getItem("loggedInUserId");
  this.user = new User();
    this.userService.getUserById(this.loginId)
    .subscribe({
      next : (data) => {
        this.user = data;
       },
      error: (e) => console.log("profile error")
    })

    this.userDataDetails = this.userService.getUserDetails().subscribe(data=> this.userDataDetails = data);
  

  var calendarEl = this.calendar.nativeElement;
  

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
        timeGridWeek:{
          type: 'timeGridWeek',
          slotDuration: '24:00:00',
          weekends: false,
          slotMinTime: "07:00:00",
          slotMaxTime: "20:00:00",
          selectable: true,
          select: this.handleDateSelect.bind(this),
          allDaySlot:false,
          contentHeight: 180,
          eventShortHeight: 100,
          eventMinHeight: 30,
          expandRows: true,
        }
    },
    
    events: [
      {
        title: 'Meeting',
        start: '2023-01-11T10:10:00',
        end: '2023-01-11T11:30:00',
      },
      
      
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
  var calendarEl2 = this.calendar2.nativeElement;
  var calendar2 = new Calendar(calendarEl2, {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin],
    views: {
        timeGridWeek:{
          type: 'timeGridWeek',
          slotDuration: '24:00:00',
          weekends: false,
          slotMinTime: "07:00:00",
          slotMaxTime: "20:00:00",
          selectable: true,
          select: this.handleDateSelect.bind(this),
          allDaySlot:false,
          contentHeight: 180,
          eventShortHeight: 100,
          eventMinHeight: 30,
          expandRows: true,
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

goToAppRegister() {
  this.router.navigate(['/app-register'])
}
  
  
Search(){
  this.userDataDetails = this.userDataDetails.filter(res=>{
    return res.name.toLocaleLowerCase().match(this.userSearch.toLocalLowerCase())
  })
}

}

