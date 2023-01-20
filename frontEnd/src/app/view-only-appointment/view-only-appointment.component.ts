import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppointmentService } from 'app/services/appointment.service';

@Component({
  selector: 'app-view-only-appointment',
  templateUrl: './view-only-appointment.component.html',
  styleUrls: ['./view-only-appointment.component.scss']
})
export class ViewOnlyAppointmentComponent implements OnInit {
  id:string;

  constructor(private route: ActivatedRoute,private appService:AppointmentService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  getApp(){
    this.appService.getAppointmentById(this.id).subscribe(
    (res : any) => {console.log("get app data is " + res)},
    error => console.log("get app error " + error))
  }



}
