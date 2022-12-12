import { Component, OnInit } from '@angular/core';
import { User } from 'app/user';
import { UserService } from 'app/user.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  userlist: any;

  users:User = new User();

  constructor(private userServices: UserService) { }

  ngOnInit() {
  }

  updateUser(id: string) {
    this.userServices.getStudentId(id)
      .subscribe(
        data => {
          this.userlist = data
        },
        error => console.log(error));
  }

}
