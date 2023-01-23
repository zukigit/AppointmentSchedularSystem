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
  res :ShowAppointment;
 
  user : User [];  
  schedule : Schdule[];
  appointment : ShowAppointment[];
  employee : any = [];

  constructor(private route: ActivatedRoute,private appService:AppointmentService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    console.log(this.res.employees+"dte")

    this.employee = new User()

    this.appService.viewOnlyAppointmentById(this.id).subscribe(
      (res : any) => {console.log("get app data is " + res),this.res = res},
      error => console.log("get app error " + error))
     

    this.getApp();
  }

  getApp(){
    this.appService.viewOnlyAppointmentById(this.id).subscribe(
    (res : any) => {console.log("get app data is " + res),this.res = res},
    error => console.log("get app error " + error))
    console.log(this.res.employees+"dte")

    // this.appService.viewOnlyAppointmentById(this.id).subscribe(this.res.employees = this.employee );
  }

  // getAppbyId(){
  //   this.appService.getAppointmentByAppId(this.app_id).subscribe( data=> this.appDatas =data);
   
  // }

}