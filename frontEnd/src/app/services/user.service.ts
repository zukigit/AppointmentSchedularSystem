import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { JwtResponse } from '../model/jwt-response';
import { teamList } from '../lists/teamList';
import { departmentList } from '../lists/departmentList';
import { Team } from '../model/team';
import { map } from 'jquery';
import { RegisterationRequestModel } from '../model/registeration-request-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  jwtToken: string = localStorage.getItem("jwtToken");
  header = {
    headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${this.jwtToken}`)
  }

  constructor(private http: HttpClient) { }
  private baseUrl = `http://localhost:8080/api/v1/`;

  getDepartment(){
   return this.http.get("http://localhost:8080/api/v1/getDepartment", this.header);
}

 getTeam() {
  console.log("get team is called");
  return this.http.get<Team[]>("http://localhost:8080/api/v1/getTeam", this.header);
}

getUserDetails(){
  return this.http.get("http://localhost:8080/api/v1/userDetails",this.header);
}

  createUser(users: RegisterationRequestModel):Observable<Object>{
    return this.http.post("http://localhost:8080/api/v1/saveUser/", users, this.header);
  }

  getUserId(id: string): Observable<Object> {  
    return this.http.get(`${this.baseUrl}/userId/${id}`, this.header);  
  }

  updateUser(data: any, id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/updateUser/${id}`, data, this.header);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteUser/${id}`, this.header);
  }
}
