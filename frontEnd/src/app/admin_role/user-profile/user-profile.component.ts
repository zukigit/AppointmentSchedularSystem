import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user';
import { UserService } from 'app/services/user.service';
import { Router } from '@angular/router';
import { ImageService } from 'app/services/image.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { data, error } from 'jquery';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  //input only number on firefox
  isNumberKey(event) {
    console.log('event', event);
    if (
      event.which != 46 &&
      event.which != 45 &&
      event.which != 46 &&
      !(event.which >= 48 && event.which <= 57)
    ) {
      return false;
    }
    return true;
  }

  pasteCallback(event) {
    
    let numberRegex = /[^\-?(\d+\.?\d*|\d*\.?\d+)$]/; // it allows integer & decimal
    if (event.clipboardData.getData('Text').match(numberRegex)) {
      console.log('clipboardData', event.clipboardData.getData('Text'));
      event.preventDefault();
    }
  }




  constructor(private http : HttpClient, private userService : UserService,private router:Router, private imageService: ImageService) { }

  nameList : any;
  imageData:any=[];
  imageUrl :any ="./assets/img/default.jpg";
  selectedFile : File ;
  photoExport : any;
  user!:User
  detailsById : any =[];
  loginId:string;
  isLoading:boolean = false;
  imageString: string;
  oldPhoneNumber: string;

  ngOnInit() {
    this.loginId = localStorage.getItem("loggedInUserId");
    this.user = new User();
    this.userService.getUserById(this.loginId)
    .subscribe({
      next : (data) => {
        this.user = data;
        this.oldPhoneNumber = this.user.phone_number;
      },
      error: (e) => console.log("profile error")
    })
    this.getImage();
  }

  onSelectFile(event){
    this.selectedFile = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  getImage(){
    this.isLoading = true;
    this.userService.getImage(this.loginId).subscribe(response => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.imageUrl = reader.result;
        this.isLoading = false;
      }, false);
      if (response) {
        reader.readAsDataURL(response);
      } else{
        this.imageUrl = "./assets/img/default.jpg";
      }
    }, error => {
      this.isLoading = false;
    });
  }

  acceptImage(){
    this.isLoading = true;
    this.userService.saveImage(this.selectedFile, this.loginId).subscribe(() => {
      this.getImage();
      Swal.fire({  
        icon: 'success',  
        title: 'Scccess',  
        text: 'Successfully Changed Profile Picture',   
      })
      this.selectedFile = null;
    });
  }

  checkChanges(){
    if(this.selectedFile == null && this.oldPhoneNumber == this.user.phone_number) {
      Swal.fire({  
        icon: 'fail',  
        title: 'FAIL',  
        text: 'Nothing has changed',   
      })
    } else if(this.selectedFile != null) {
      this.acceptImage();
    } else if(this.oldPhoneNumber != this.user.phone_number) {
      this.updatePhoneNumber();
    }
  }

  deleteImage(){
    this.isLoading = true;
    this.userService.deleteImage(this.loginId).subscribe(
      data => {
        this.isLoading = false;
        this.imageUrl = "./assets/img/default.jpg";
        Swal.fire({  
          icon: 'success',  
          title: 'Scccess',  
          text: 'Successfully Deleted Profile Picture',   
        })
      }
    );
  }

  getUserDetailsById(){
    this.detailsById = this.userService.getUserById(this.detailsById).subscribe(data=> this.detailsById=data);
  }

  updatePhoneNumber() {
    this.isLoading = true;
    this.userService.updatePhoneNo(this.loginId,this.user.phone_number).subscribe(
      data =>{
        this.isLoading = false;
        this.oldPhoneNumber = this.user.phone_number;
        Swal.fire({  
          icon: 'success',  
          title: 'Scccess',  
          text: 'Successfully Change Phone Number',   
        })
      } 
    )
  }
  changePass(id:string) {
    this.router.navigate(['admin/change_pass',id]);
  }
}