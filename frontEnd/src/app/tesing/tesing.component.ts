import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'app/services/appointment.service';

@Component({
  selector: 'app-tesing',
  templateUrl: './tesing.component.html',
  styleUrls: ['./tesing.component.scss']
})
export class TesingComponent implements OnInit {
res:any;
id:string;
  constructor(private route: ActivatedRoute,private appService:AppointmentService) { }
   HEROES = [
    {id: 1, name:'Superman'},
    {id: 2, name:'Batman'},
    {id: 5, name:'BatGirl'},
    {id: 3, name:'Robin'},
    {id: 4, name:'Flash'}
];

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.appService.viewOnlyAppointmentById(this.id).subscribe(
      (res : any) => {console.log("get app data is " + res.employee),this.res = res;
      console.log(this.res.employee)
},
      error => console.log("get app error " + error))
   
    }
}
  

