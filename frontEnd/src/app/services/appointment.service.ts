import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentRegister } from 'app/model/appointment-register';
import { Schdule } from 'app/model/schdule';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  jwtToken: string = localStorage.getItem("jwtToken");
  header = {
    headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${this.jwtToken}`)
  }

  constructor(private http: HttpClient) { }
  private baseUrl = `http://localhost:8080/api/v1`;

  createAppointment(app: AppointmentRegister):Observable<Object> {
    return this.http.post("http://localhost:8080/api/v1/addAppointment/", app, this.header);
  }

  getAllAppointment() {
    return this.http.get("http://localhost:8080/api/v1/getSchedules",this.header);
  }
}
