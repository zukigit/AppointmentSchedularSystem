import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-register',
  templateUrl: './app-register.component.html',
  styleUrls: ['./app-register.component.scss']
})
export class AppRegisterComponent implements OnInit {

  sDate: any;
  eDate: any;

  sTime:any;
  eTime:any;

  constructor() { }

  ngOnInit(): void {
  }


  addAppointment() {
    this.sDate = new Date(this.sDate);
    this.eDate = new Date(this.eDate);
    function getDataForDate(date) {
      return `Data for ${date.toISOString().slice(0, 10)}`;
    }
    while (this.sDate <= this.eDate) {
      const data = getDataForDate(this.sDate);
      console.log(data);
      this.sDate.setDate(this.sDate.getDate() + 1);
    }

    console.log("time is " + this.sTime)
  }


}
