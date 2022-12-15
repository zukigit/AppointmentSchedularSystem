import { state } from '@angular/animations';
import { Component} from '@angular/core';

import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private userServices : UserService , private list:UserService) {}

  ngOnInit() {

    // this.userServices.getAllData()
    //   .subscribe(data => {
    //     console.log(data)
    //   })
  }

 
}
