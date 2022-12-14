import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtResponse } from './jwt-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:8080";
  jwtToken: string = localStorage.getItem("jwtToken");
  requestHeader = new HttpHeaders({ 'Authorization': `Bearer ${this.jwtToken}`});

  getAllData(): Observable<any> {
    console.log("get all data method is called");
    // return this.http.get(this.baseUrl + '/auth', {
    //   headers : this.requestHeader
    // });
    return this.http.post(this.baseUrl + '/auth', "");
  }


  getStudentId(id: string): Observable<Object> {  
    return this.http.get(`${this.baseUrl}/student/${id}`);  
  }

  updateUser(data: any, id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/updateUser/${id}`, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteUser/${id}`);
  }
}
