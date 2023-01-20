import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentRegister } from 'app/model/appointment-register';
import { Schdule } from 'app/model/schdule';
import { ShowAppointment } from 'app/model/show-appointment';
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

  getAppointmentById(id: string): Observable<ShowAppointment[]> {  
    return this.http.get<ShowAppointment[]>(`${this.baseUrl}/getAppById/${id}`, this.header);  
  }

  uploadFiles(files : FormData):Observable<Object> {
    const headers = new HttpHeaders()
                                    .set('Authorization',  `Bearer ${this.jwtToken}`);
    headers.append('Content-Type', `multipart/form-data`);

    return this.http.post("http://localhost:8080/api/v1/uploadFile", files, {headers, responseType: 'text'});
  }
  
  
  viewOnlyAppointmentById(id: string): Observable<ShowAppointment[]> {  
    return this.http.get<ShowAppointment[]>(`${this.baseUrl}/getViewApp/${id}`, this.header);  
  }
}
