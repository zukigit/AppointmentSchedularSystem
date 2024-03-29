import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { Team } from '../model/team';
import { RegisterationRequestModel } from '../model/registeration-request-model';
import { ChangePass } from 'app/model/change-pass';
import { Schdule } from 'app/model/schdule';

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

   saveImage(selectedFile : File, id : string):Observable<Blob>{
    
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('userId', id);

    const headers = new HttpHeaders()
                                    .set('Authorization',  `Bearer ${this.jwtToken}`);
    
    headers.append('Content-Type', `multipart/form-data`);
    headers.append('responseType', `blob`);

    return this.http.post("http://localhost:8080/api/v1/uploadImage", formData, { headers, responseType: 'blob'});
    
  }

  getImage(userId:string):Observable<Blob> {
    const headers = new HttpHeaders()
                                    .set('Authorization',  `Bearer ${this.jwtToken}`);
    return this.http.get(`http://localhost:8080/api/v1/images?userId=${userId}`, { headers, responseType: 'blob'});
  }

  updatePhoneNo(userId:string,phone_number:string):Observable<Object>{
    return this.http.get(`${this.baseUrl}/updatePhoneNumber?userId=${userId}&newPhoneNumber=${phone_number} `, this.header);
  }

  chgPass(pass: ChangePass):Observable<Object>{
    return this.http.post("http://localhost:8080/api/v1/changePassword/", pass, this.header);
  }

  deleteImage(userId:string) : Observable<Object>{
    console.log("userid " + userId);
    const headers = new HttpHeaders()
                                    .set('Authorization',  `Bearer ${this.jwtToken}`);
    return this.http.delete(`http://localhost:8080/api/v1/images/${userId}`, {headers, responseType: 'text'});
  }

  getAvaliables(schdules:Schdule[]) {
    return this.http.post(`${this.baseUrl}/getAvaliableEmployees`, schdules, this.header);
  }
}
