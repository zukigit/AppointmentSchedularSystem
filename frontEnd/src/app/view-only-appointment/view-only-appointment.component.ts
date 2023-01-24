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

  res :ShowAppointment;
  
  user : User;  
  schedule : Schdule[];
  appointment : ShowAppointment[];
 
  new_Date: Date = new Date();
  start_time : string;
  end_time: string ;


  constructor(private route: ActivatedRoute,private appService:AppointmentService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    
     this.appService.viewOnlyAppointmentById(this.id).subscribe(
        (res : any) => {console.log("get app data is " + res.employee),this.res = res;
        console.log(this.res.employee)
        // for(let x of this.res.employee) {
          
        //   console.log("idddddddddddddddd " + x.employee_id)
        // }
  },
        error => console.log("get app error " + error))
      // this.userOfApp()

      }

      // userOfApp(){
      //   for(let x of this.res.employee) {
      //     console.log("idddddddddddddddd " + x.employee_id)
      //   }
      // }
}
