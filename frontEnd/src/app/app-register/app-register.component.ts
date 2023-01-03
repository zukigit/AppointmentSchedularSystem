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
    this.doReset();
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

  name = 'Angular';
  private sourceDevice: AssignedDeviceCode[] = [];
      private confirmedDevice: Array<any>;
      //AssignDevice: AssignedDeviceCode[] = [];
      //UnassignDevice: UnAssignedDeviceCode[] = [];
      tab = 1;
      keepSorted = true;
      key: string;
      display: any;
      filter = true;
      source: AssignedDeviceCode[] = [];
      confirmed: UnAssignedDeviceCode[] = [];
      userAdd = '';
      disabled = false;
      sourceLeft = true;
      AssignDevice = [{"deviceCode":"100006","isValid":true,"validationErrors":{"items":[]}},{"deviceCode":"100008","isValid":true,"validationErrors":{"items":[]}},{"deviceCode":"100009","isValid":true,"validationErrors":{"items":[]}},{"deviceCode":"100010","isValid":true,"validationErrors":{"items":[]}}];
      UnassignDevice=[{"deviceCode":"100005","isValid":true,"validationErrors":{"items":[]}},{"deviceCode":"100007","isValid":true,"validationErrors":{"items":[]}}];
      format: any = { add: 'Remove Device from User', remove: 'Assign Device To User', all: 'Select All', none: 'Unselect All', direction: 'left-to-right', draggable: true, locale: undefined };

      // ngOnInit(): void {
      //     this.doReset();
      // }
    doReset() {
          this.sourceDevice = JSON.parse(JSON.stringify(this.AssignDevice));
          this.confirmedDevice = JSON.parse(JSON.stringify(this.UnassignDevice));
          console.log(this.confirmedDevice);
          this.populateList();
      }

      private populateList() {
          this.key = 'deviceCode';
          this.display = this.showLabel;
          this.keepSorted = true;
          this.source = [...this.sourceDevice, ...this.confirmedDevice];
          this.confirmed = this.confirmedDevice;
          console.log("source: " + JSON.stringify(this.source));
          console.log("confirmed: " + JSON.stringify(this.confirmed));
      }

      private showLabel(item: any) {
          return item.deviceCode;
      }
  }


  export class AssignedDeviceCode {
      public DeviceCode: number;
  }
  export class UnAssignedDeviceCode {
      public DeviceCode: number;
  }
