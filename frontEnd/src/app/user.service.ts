import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { JwtResponse } from './jwt-response';
import { teamList } from './lists/teamList';
import { departmentList } from './lists/departmentList';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private baseUrl = `http://localhost:8080/api/v1/`;

  getDepartment(){
   return this.http.get("http://localhost:8080/api/v1/getDepartment");
}

 getTeam() {
   return this.http.get("http://localhost:8080/api/v1/getTeam");
}

  getUserList(){
    return this.http.get("http://localhost:8080/api/v1/getUser/");
  }

  createUser(users: User):Observable<Object>{
    return this.http.post("http://localhost:8080/api/v1/saveUser/", users);
  }

  getUserId(id: string): Observable<Object> {  
    return this.http.get(`${this.baseUrl}/userId/${id}`);  
  }

  updateUser(data: any, id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/updateUser/${id}`, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteUser/${id}`);
  }
}
