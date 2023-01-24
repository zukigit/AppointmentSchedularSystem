import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'app/services/appointment.service';
import { data } from 'jquery';

@Component({
  selector: 'app-appointment-detail-view',
  templateUrl: './appointment-detail-view.component.html',
  styleUrls: ['./appointment-detail-view.component.scss']
})
export class AppointmentDetailViewComponent implements OnInit {

  res:any;
  id:string;
  files = [];
  constructor(private route: ActivatedRoute,private appService:AppointmentService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.appService.viewOnlyAppointmentById(this.id).subscribe(
      (res : any) => {
        this.res = res;
        this.files = res.files;
        console.log(this.files);
      },
      error => console.log("get app error " + error))
    }

    downloadFile(fileId:number, type:string, fileName:string) {
      let binaryData:any;
      this.appService.fileDownload(407).subscribe(
        data => {
          let blob = new Blob([data], { type: type});
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(blob);
          if (fileName)
                downloadLink.setAttribute('download', fileName);
            document.body.appendChild(downloadLink);
            downloadLink.click();
        }
      )
    }
}
