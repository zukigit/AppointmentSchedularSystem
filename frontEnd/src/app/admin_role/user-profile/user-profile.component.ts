import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user';
import { UserService } from 'app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private http : HttpClient,private userService : UserService,private router:Router) { }

   nameList : any;

   imageUrl :string ="./assets/img/default.jpg";

   selectedFile : File ;
   photoExport : any;

    user!:User

    detailsById : any =[];
    loginId:string=localStorage.getItem("loggedInUserId");

  ngOnInit() {
    this.loginId;
    this.user = new User();
    this.userService.getUserById(this.loginId)
    .subscribe({
      next : (data) => {
        this.user = data;
      },
      error: (e) => console.log("profile error")
    })

  }

  onSelectFile(event){
    this.selectedFile = event.target.files[0];
  }

  acceptImage(){
   this.userService.saveImage(this.selectedFile, this.loginId).subscribe(data=> console.log(data));
  }

  getUserDetailsById(){
    this.detailsById = this.userService.getUserById(this.detailsById).subscribe(data=> this.detailsById=data);
  }

  updatePhoneNumber() {
    console.log("Login id  " + this.loginId)
    console.log("phone number " + this.user.phone_number)
    this.userService.updatePhoneNo(this.loginId,this.user.phone_number).subscribe(
      data=>alert("Successfully Change Phone Number")
    )
  }
  changePass(id:string) {
    this.router.navigate(['admin/change_pass',id]);
  }
}