import { Component, OnInit } from '@angular/core';
import { ChangePass } from 'app/model/change-pass';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {

  changePass:ChangePass=new ChangePass();

  visible: boolean = true;
  changetype: boolean = true;

  loginId:string=localStorage.getItem("loggedInUserId");


  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }




  viewpass_one() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  viewpass_two() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  constructor(private service:UserService) { }

  ngOnInit(): void {
  }

  changePassword() {
    this.changePass.userid=this.loginId;
    this.changePass.new_password=this.changePass.new_password;
    this.changePass.old_password=this.changePass.old_password;
    console.log("change userid" + this.changePass.old_password)
    this.service.chgPass(this.changePass).subscribe(
      data => alert("Ok"))
    //   error=> alert("Something Wrong>>")
    // )
  }

}
