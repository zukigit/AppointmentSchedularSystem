import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppointmentRegister } from 'app/model/appointment-register';
import { AppointmentService } from 'app/services/appointment.service';
import { UserService } from 'app/services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-appointment-detail-view-bytrainee',
  templateUrl: './appointment-detail-view-bytrainee.component.html',
  styleUrls: ['./appointment-detail-view-bytrainee.component.scss']
})
export class AppointmentDetailViewBytraineeComponent implements OnInit {
  res:any = {
    "title" : ""
  };
  id:string;
  files = [];
  employee = [];
  urls = [];
  loginId: string;
  app:any = new AppointmentRegister();
  date:string;
  isCreateUser:boolean = false;
  isLoad = false;

  constructor(private route: ActivatedRoute,private appService:AppointmentService, private userService:UserService, private router: Router) { }

  ngOnInit(): void {
    this.isLoad = true;
    this.id = this.route.snapshot.params['id'];
    this.loginId = localStorage.getItem("loggedInUserId");
    this.route.queryParams.subscribe(params => {
      this.date = JSON.parse(params.data);
    });
    this.appService.viewOnlyAppointmentById(this.id).subscribe(
      (res : any) => {
        this.isLoad = false;
        if(res.createUser.employee_id == this.loginId) {
          this.isCreateUser = true;
        }
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
              // alert("this appointment is private and you are not in there")
              Swal.fire({  
                icon: 'error',  
                title: 'Access Denied',  
                text: 'This appointment is private and you are not in there',   
              })
              this.router.navigate(['/trainee/dashboard']);
            }
          );
        } else {
          this.res = res;
          this.files = res.files;
          this.employee = res.employee;
          this.generatePhotos();
        }
      },
      error => {
        // alert("this appointment is deleted"),
        Swal.fire({   
          title: 'This Appointment was already deleted ', 
        })
        this.router.navigate(['trainee/dashboard'])
      });
  }

  //update
  // updateApp() {
  //   this.router.navigate(['trainee/update-app',this.id])
  // }
   
  //delete
  // deleteApp(){
  //   this.appService.deleteApp(this.id,this.date).subscribe(
  //     data => {
  //       Swal.fire('Appointment Delete!!', 'Appointment Delete succesfully!', 'success');
  //     this.router.navigate(['admin/dashboard'])
  //   },
  //     error => console.log("fail delete")
  //   )
  // }

//   deleteApp(){
//     Swal.fire({
//       title: "Are you sure want to delete appointment from " + this.date + " ? ",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!"
//   }).then((result) => {
//     if (result.value) {this.appService.deleteApp(this.id,this.date).subscribe(
//           data => {
//             this.router.navigate(['trainee/dashboard'])
//             Swal.fire({
//               title: "Successfully Deleted",
//               text: "Appointment is deleted",
//               icon: "success",
//           });
//         },
//           // error => console.log("fail delete")
//         )
//     }
// })
    
    
//   }

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
