import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Image } from 'app/model/image';
import { User } from 'app/model/user';
import { UserService } from 'app/services/user.service';
import { data, event } from 'jquery';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private http : HttpClient,private userService : UserService) { }

    imageUrl :string ="./assets/img/default.jpg";
    fileUpload : File =null;
    image = new Image();
    user!:User

    detailsById : any =[];
    loginId:string;

  ngOnInit() {
    this.loginId = localStorage.getItem("loggedInUserId");
    this.user = new User();
    this.userService.getUserById(this.loginId)
    .subscribe({
      next : (data) => {
        this.user = data;
      },
      error: (e) => console.log("profile error")
    })

  }

  // onSelectFile(e){
  //   if(e.target.files){
  //     var reader = new FileReader();
  //     reader.readAsDataURL(e.target.files[0]);
  //     reader.onload=(event:any)=>{
  //       this.url=event.target.result;

  //      }
  //   }
  // }

  onSelectFile(file: FileList){
    this.fileUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload);
  }

  acceptImage(user : any, image : any){
    this.userService.saveImage(user.value,this.fileUpload).subscribe(
      data => {
        user.value = null;
        image.value = null;
        this.imageUrl = "./assets/img/default.jpg"
      }
    )
    console.log("photo is inserted" + this.image);
    
  }

  getUserDetailsById(){
    this.detailsById = this.userService.getUserById(this.detailsById).subscribe(data=> this.detailsById=data);
  }

}
