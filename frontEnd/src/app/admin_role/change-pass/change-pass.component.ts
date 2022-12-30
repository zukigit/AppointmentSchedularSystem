import { Component, OnInit } from '@angular/core';
import { ChangePass } from 'app/model/change-pass';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {

  changePass: ChangePass = new ChangePass();

  visible: boolean = true;
  changetype: boolean = true;

  loginId: string = localStorage.getItem("loggedInUserId");


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

  constructor(private service: UserService) { }

  ngOnInit(): void {
  }

  changePassword() {
    this.changePass.userId = this.loginId;

    if (this.changePass.newPassword != this.changePass.conPassword) {
      alert("Password and Confirm password does not match")
    } else {
      console.log("change userid" + this.changePass.oldPassword)
      this.service.chgPass(this.changePass).subscribe(
        data => alert("Ok"),
        error => alert("Old password wrong!!!"))
    }
  }


}
