import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'app/services/appointment.service';
import { UserService } from 'app/services/user.service';
import { data } from 'jquery';

@Component({
  selector: 'app-appointment-detail-view-bytrainee',
  templateUrl: './appointment-detail-view-bytrainee.component.html',
  styleUrls: ['./appointment-detail-view-bytrainee.component.scss']
})
export class AppointmentDetailViewBytraineeComponent implements OnInit {

  res:any;
  id:string;
  files = [];
  employee = [];
  urls = [];

  constructor(private route: ActivatedRoute,private appService:AppointmentService, private userService:UserService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.appService.viewOnlyAppointmentById(this.id).subscribe(
      (res : any) => {
        this.res = res;
        this.files = res.files;
        this.employee = res.employee;
        this.generatePhotos();
      },
      error => console.log("get app error " + error));
    }

    //update
    updateApp() {
      alert("Ok nrr sarrr")
    }
    //delete
    deleteApp(){
      alert("Okayy")
    }

    downloadFile(file) {      
      this.appService.fileDownload(file.file_id).subscribe(
        data => {
          let blob = new Blob([data], { type: file.type});
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(blob);
          if (file.file_name)
                downloadLink.setAttribute('download', file.file_name);
          document.body.appendChild(downloadLink);
          downloadLink.click();
        }
      )
    }

    generatePhotos() {
      for(let i = 0 ; i < this.employee.length; i++) {
        if(this.employee[i].userImage == null) {
          this.employee[i].userImage = new Image();
          this.employee[i].userImage.data = "./assets/img/default.jpg";
        } else {
          this.userService.getImage(this.employee[i].employee_id).subscribe(response => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
              this.employee[i].userImage.data = reader.result;
            }, false);
            if (response) {
              reader.readAsDataURL(response);
            } else{
              this.employee[i].userImage.data = "./assets/img/default.jpg";
            }
          });
        }
      }
    }
  
}

