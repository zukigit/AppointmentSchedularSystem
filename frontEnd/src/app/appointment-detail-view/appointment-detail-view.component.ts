import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppointmentRegister } from 'app/model/appointment-register';
import { AppointmentService } from 'app/services/appointment.service';
import { UserService } from 'app/services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-appointment-detail-view',
  templateUrl: './appointment-detail-view.component.html',
  styleUrls: ['./appointment-detail-view.component.scss']
})
export class AppointmentDetailViewComponent implements OnInit {

  res:any = {
    "title" : ""
  };
  id:string;
  files = [];
  employee = [];
  urls = [];
  loginId: string;
  app:any = new AppointmentRegister();

  constructor(private route: ActivatedRoute,private appService:AppointmentService, private userService:UserService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loginId = localStorage.getItem("loggedInUserId");
    this.appService.viewOnlyAppointmentById(this.id).subscribe(
      (res : any) => {
        if(res.type != "PUBLIC") {
          this.appService.checkUserInclude(this.loginId, res.appointment_id).subscribe(
            (data: any) => {
              if (data) {
                this.res = res;
                this.files = res.files;
                this.employee = res.employee;
                this.generatePhotos();
              }
            }, error => {
              alert("this appointment is private and you are not in there")
              this.router.navigate(['/admin/dashboard']);
            }
          );
        } else {
          this.res = res;
          this.files = res.files;
          this.employee = res.employee;
          this.generatePhotos();
        }
      },
      error => console.log("get app error " + error));
  }

  //update
  updateApp() {
      this.appService.viewOnlyAppointmentById(this.id).subscribe(
        data=>{
          this.app = data
          if (this.app.createUser.employee_id != this.loginId) {
            alert("can't update other user")
          }else{
            this.router.navigate(['admin/update-app',this.id])
          }
        }
      )
      
  }
   
  //delete
  deleteApp(){
    this.appService.viewOnlyAppointmentById(this.id).subscribe(
      data=>{
        this.app = data
        if (this.app.createUser.employee_id != this.loginId) {
          alert("can't delete other user")
        }else{
          this.appService.deleteApp(this.id).subscribe(
            data => {Swal.fire('Appointment Delete!!', 'Appointment Delete succesfully!', 'success');
            this.router.navigate(['admin/dashboard'])
          },
            error => console.log("fail delete")
          )
        }
      }
    )
    
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
