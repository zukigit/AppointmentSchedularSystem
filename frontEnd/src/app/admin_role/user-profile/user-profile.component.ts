import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user';
import { UserService } from 'app/services/user.service';
import { Router } from '@angular/router';
import { ImageService } from 'app/services/image.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private http : HttpClient, private userService : UserService,private router:Router, private imageService: ImageService) { }

  nameList : any;
  imageData:any=[];
  imageUrl :any ="./assets/img/default.jpg";
  selectedFile : File ;
  photoExport : any;
  user!:User
  detailsById : any =[];
  loginId:string=localStorage.getItem("loggedInUserId");

  imageString: string;

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
    this.getImage();
  }

  onSelectFile(event){
    this.selectedFile = event.target.files[0];
  }

  getImage(){
    this.userService.getImage(this.loginId).subscribe(response => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.imageUrl = reader.result;
      }, false);
      if (response) {
        reader.readAsDataURL(response);
      }
    });
  }

  acceptImage(){
    this.userService.saveImage(this.selectedFile, this.loginId).subscribe(response => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.imageUrl = reader.result;
      }, false);
      if (response) {
        reader.readAsDataURL(response);
      }
    });
  }

  getUserDetailsById(){
    this.detailsById = this.userService.getUserById(this.detailsById).subscribe(data=> this.detailsById=data);
  }

  updatePhoneNumber() {
    this.userService.updatePhoneNo(this.loginId,this.user.phone_number).subscribe(
      data=>alert("Successfully Change Phone Number")
    )
  }
  changePass(id:string) {
    this.router.navigate(['admin/change_pass',id]);
  }
}