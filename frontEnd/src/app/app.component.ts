import { state } from '@angular/animations';
import { Component} from '@angular/core';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // constructor(private userServices : UserService , private userList:UserService) {}

  ngOnInit() {

    // this.userServices.getAllData()
    //   .subscribe(data => {
    //     console.log(data)
    //   })
  }

 
}
