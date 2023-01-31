import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReportService {
  jwtToken: string = localStorage.getItem("jwtToken");
  header = {
    headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${this.jwtToken}`)
  }

  constructor(private http: HttpClient) { }
  private baseUrl = `http://localhost:8080/api/v1`;



  getAllAppointment() {
    return this.http.get("http://localhost:8080/api/v1/getSchedules",this.header);
  }
  reportUserAll(){
    alert("report User Service ok")
    return this.http.get('http://localhost:8080/api/v1/reportAllUser', this.header);

  }
  todayAppointment(){
    alert("report User Service ok")
    return this.http.get('http://localhost:8080/api/v1/todayAppointment', this.header);
  }

  // getAllApp(){
  //   alert("report User Service ok")
  //   return this.http.get('http://localhost:8080/api/v1/getAll', this.header);
  // }


    getAllApp(id:string):Observable<Object>{
    alert("Saved on Desktop ok")
    return this.http.get(`${this.baseUrl}/getAllApp/${id}`, this.header);
    }
}
