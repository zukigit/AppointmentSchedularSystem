import { Component} from '@angular/core';

import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private userServices : UserService) {}

  ngOnInit() {
    // this.userServices.getAllData()
    //   .subscribe(data => {
    //     console.log(data)
    //   })
  }

}
