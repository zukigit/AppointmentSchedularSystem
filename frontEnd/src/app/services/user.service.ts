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
import { Image } from 'app/model/image';
import { Search } from 'app/model/search';
import { ChangePass } from 'app/model/change-pass';

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
  private baseUrl = `http://localhost:8080/api/v1`;

  getDepartment(){
   return this.http.get("http://localhost:8080/api/v1/getDepartment", this.header);
}

 getTeam() {
  return this.http.get<Team[]>("http://localhost:8080/api/v1/getTeam", this.header);
}

getUserDetails(){
  return this.http.get("http://localhost:8080/api/v1/userDetail", this.header);
}

  createUser(users: RegisterationRequestModel):Observable<Object>{
    return this.http.post("http://localhost:8080/api/v1/saveUser/", users, this.header);
  }

  getUserById(id: string): Observable<User> {  
    return this.http.get<User>(`${this.baseUrl}/getById/${id}`, this.header);  
  }

  updateUser(id: string, user:User): Observable<User> {
    return this.http.put(`${this.baseUrl}/updateUser/${id}`, user, this.header);
  }

  deleteUser(id: string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/deleteUser/${id}`, this.header);
  }

  saveImage(uploadImageData : FormData):Observable<Object>{
    return this.http.post("http://localhost:8080/api/v1/image",uploadImageData, this.header);
  }

  updatePhoneNo(userId:string,phone_number:string):Observable<Object>{
    return this.http.get(`${this.baseUrl}/updatePhoneNumber?userId=${userId}&newPhoneNumber=${phone_number} `, this.header);
  }

  chgPass(pass: ChangePass):Observable<Object>{
    console.log("service data "+ pass.new_password)
    return this.http.post("http://localhost:8080/api/v1/changePassword/", pass, this.header);
  }

}
