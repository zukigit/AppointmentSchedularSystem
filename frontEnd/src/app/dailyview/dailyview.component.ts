import { Component, ChangeDetectorRef, OnInit, ViewChild, VERSION, ElementRef } from '@angular/core';
import { Calendar} from '@fullcalendar/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Router } from '@angular/router';
import { FixedScaleAxis } from 'chartist';
//import { INITIAL_EVENTS, createEventId } from './event-utils';

@Component({
  selector: 'app-dailyview',
  templateUrl: './dailyview.component.html',
  styleUrls: ['./dailyview.component.css']
})
export class DailyviewComponent implements OnInit {

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
  @ViewChild('calendar2', { static: true }) calendar2: ElementRef<any>;

name = 'Angular ' + VERSION.major;


ngOnInit() {
  var calendarEl = this.calendar.nativeElement;
  var calendarEl2 = this.calendar2.nativeElement;

  var calendar = new Calendar(calendarEl, {
    initialView: 'timeGridDay',
    plugins: [timeGridPlugin],
    views: {
      timeGridDay:{
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
        start: '2023-01-11T10:10:00',
        end: '2023-01-11T11:30:00',
      },
      
      
      {
        title: 'Meeting',
        start: '2023-01-11T16:40:00',
        end: '2023-01-11T18:50:00',
      },
      

    ],
  });
  var calendar2 = new Calendar(calendarEl2, {
    initialView: 'timeGridDay',
    plugins: [timeGridPlugin],
    views: {
      timeGridDay:{
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
      left: '',
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

// goToApp() {
//   this.router.navigate(['app-register'])
// }
  
}