import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {



  visible: boolean = true;
  changetype: boolean = true;


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

  constructor() { }

  ngOnInit(): void {
  }

}
