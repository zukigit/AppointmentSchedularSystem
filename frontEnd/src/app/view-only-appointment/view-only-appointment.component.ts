import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Schdule } from 'app/model/schdule';
import { ShowAppointment } from 'app/model/show-appointment';
import { User } from 'app/model/user';
import { AppointmentService } from 'app/services/appointment.service';

@Component({
  selector: 'app-view-only-appointment',
  templateUrl: './view-only-appointment.component.html',
  styleUrls: ['./view-only-appointment.component.scss']
})
export class ViewOnlyAppointmentComponent implements OnInit {
  id:string ;

  app_id : string = "9";
  appDatas : any = [];
 
  user : User [];  
  schedule : any;
  appointment : any;

  constructor(private route: ActivatedRoute,private appService:AppointmentService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.schedule = new Schdule();
    this.appointment = new ShowAppointment();

    this.getAppbyId();
  }

  getApp(){
    this.appService.getAppointmentById(this.id).subscribe(
    (res : any) => {console.log("get app data is " + res)},
    error => console.log("get app error " + error))
  }

  getAppbyId(){
    this.appService.getAppointmentByAppId(this.app_id).subscribe( data=> this.appDatas =data);
   
  }

}