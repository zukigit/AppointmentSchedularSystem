import { Component, ChangeDetectorRef, OnInit, ViewChild, VERSION, ElementRef } from '@angular/core';
import { Calendar} from '@fullcalendar/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Router } from '@angular/router';
//import { INITIAL_EVENTS, createEventId } from './event-utils';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit  {
  startDate = new Date()
    constructor(private changeDetector: ChangeDetectorRef,private router:Router) {
      this.header = {
        left: 'today prev,next',
        center: 'title',
        right: 'timeGridDay,timeLineWeek'                
    }
  };
  header: any;
  calendarVisible = true;
  
    @ViewChild('calendar', { static: true }) calendar: ElementRef<any>;
  name = 'Angular ' + VERSION.major;

  ngOnInit() {
    var calendarEl = this.calendar.nativeElement;

    var calendar = new Calendar(calendarEl, {
      initialView: 'timeGridDay',
      // initialDate: '2020-06-07',
      plugins: [dayGridPlugin, timeGridPlugin],
      // views: {
      //     timeGridDay:{
      //       type: 'timeGridDay',
      //         select: this.handleDateSelect.bind(this),
      //     }
      // },
      
      events: [
        {
          title: 'Meeting',
          start: this.startDate,
        },
      ],
    });

    calendar.render();
  }
  handleDateSelect(selectInfo: DateSelectArg) {
    

    }

    goToApp() {
      this.router.navigate(['app-register'])
    }
    
}

 