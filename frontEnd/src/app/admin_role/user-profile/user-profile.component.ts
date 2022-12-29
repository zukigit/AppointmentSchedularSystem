import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Image } from 'app/model/image';
import { User } from 'app/model/user';
import { UserService } from 'app/services/user.service';
import { response } from 'express';
import { data, event } from 'jquery';
import { isContext } from 'vm';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private http : HttpClient,private userService : UserService) { }

   nameList : any;

  //  imageUrl :string ="./assets/img/default.jpg";

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

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.selectedFile = event.target.files[0];
  
    }
    reader.readAsDataURL(this.selectedFile);
    }

  acceptImage(){

    console.log(this.selectedFile);

    const uploadImageData = new FormData();
    uploadImageData.append('image',this.selectedFile,this.selectedFile.name);
    uploadImageData.append('id',this.selectedFile,this.selectedFile.name);

    this.photoExport = this.selectedFile;

    // this.photoExport = this.userService.saveImage(uploadImageData);
  }

  getUserDetailsById(){
    this.detailsById = this.userService.getUserById(this.detailsById).subscribe(data=> this.detailsById=data);
  }

  getInitialNames(name){
    // console.log("name is" + name);
    // const initialName : string = name.
   
   
    this.nameList = this.userService.getUserById(this.loginId).subscribe(data=> this.nameList =data);
    
    const canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    canvas.width=32;
    canvas.height=32;
    document.body.appendChild(canvas);

    const context = canvas.getContext('2d');
    context.fillStyle = '#476ce8';
    context.fillRect(0,0,canvas.width , canvas.height);
    context.font = '20px Arial';
    context.fillStyle = '#FFFFFF';
    
    const nameList = name.split(' ');
    console.log("name is" + name);
    console.log("namelist is" + nameList);
    let initials = '';
    for(let i = 0; i < nameList.length; i++){
      // if(i<1){
      //   initials = initials + nameList[i][0];
      // }

      initials+= nameList[i][0];
      if(initials.length >= 1){
        context.fillText(initials.toUpperCase(),7,22);
      }
      console.log("initial : "+initials);
    }
    
    // else{
    //   context.fillText(initials.toUpperCase(),10,22);
    // }
    const data = canvas.toDataURL();
    document.body.removeChild(canvas);
    console.log("outside");
    return data;
  }
 
  updatePhoneNumber() {
    console.log("Login id  " + this.loginId)
    console.log("phone number " + this.user.phone_number)
    this.userService.updatePhoneNo(this.loginId,this.user.phone_number).subscribe(
      data=>alert("Successfully Change Phone Number")
    )
  }
}