import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { createEventId } from 'app/event-utils';
import { Router } from '@angular/router';
//import { INITIAL_EVENTS, createEventId } from './event-utils';
import { Calendar } from 'fullcalendar';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent  {
  header: any;
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    // customButtons: {
    //   myCustomButton: {
    //     text: 'Remove Mamber',
    //     click: function () {
    //       alert('clicked the custom button!');
    //     }
    //   }
    // },
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      //listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridDay,timeGridWeek',
    },

    
 
  views: {
    timeGridWeek: {
          type: 'timeGridWeek',
          slotDuration: '24:00:00',
          weekends: false,
          slotMinTime: "08:00:00",
          slotMaxTime: "18:00:00",
          selectable: true,
          allDaySlot:false,
          select: this.handleDateSelect.bind(this),
          contentHeight: 200
          // this.calendarOptions.setOption('height', 700),
      },
      timeGridDay:{
        type: 'timeGridDay',
          slotMinTime: "08:00:00",
          slotMaxTime: "18:00:00",
          slotDuration: '00:15:00',
          selectable: true,
          allDaySlot:false,
          select: this.handleDateSelect.bind(this),
      }
  },
    initialView: 'timeGridDay',
    //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    // weekends: false,
    // slotMinTime: "08:00:00",
    // slotMaxTime: "18:00:00",
    // slotDuration: '00:15:00',
    // selectable: true,
    // allDaySlot:false,
    // select: this.handleDateSelect.bind(this),
    // eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  
  currentEvents: EventApi[] = [];

  constructor(private changeDetector: ChangeDetectorRef,private router:Router) {
    this.header = {
      left: 'today prev,next',
      center: 'title',
      right: 'timeGridDay,timeLineWeek'                
  };

  
  }
  
  
  // handleCalendarToggle() {
  //   this.calendarVisible = !this.calendarVisible;
  // }

  // handleWeekendsToggle() {
  //   const { calendarOptions } = this;
  //   calendarOptions.weekends = !calendarOptions.weekends;
  // }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.router.navigate(['app-register'])
    // const title = prompt('Please enter a new title for your event');
    // const calendarApi = selectInfo.view.calendar;

    // calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });

    }
  }

  // handleEventClick(clickInfo: EventClickArg) {
  //   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
  //     clickInfo.event.remove();
  //   }
  // }

  // handleEvents(events: EventApi[]) {
  //   this.currentEvents = events;
  //   this.changeDetector.detectChanges();
  // }


