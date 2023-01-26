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
    return this.http.get<ShowAppointment[]>(`${this.baseUrl}/getAppByEmpId/${id}`, this.header);  
  }

  uploadFiles(files : FormData):Observable<Object> {
    const headers = new HttpHeaders()
                                    .set('Authorization',  `Bearer ${this.jwtToken}`);
    headers.append('Content-Type', `multipart/form-data`);

    return this.http.post("http://localhost:8080/api/v1/uploadFile", files, {headers, responseType: 'text'});
  }
  
  
  viewOnlyAppointmentById(id: string): Observable<ShowAppointment[]> {  
    return this.http.get<ShowAppointment[]>(`${this.baseUrl}/appointmentDetail/${id}`, this.header);  
  }

  checkUserInclude(id: string, appoointmentId : number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/isUserIncludeInAppointment?employeeId=${id}&appointmentId=${appoointmentId}`, this.header);
  }

  fileDownload(fileId:number) : Observable<Blob> {
    const headers = new HttpHeaders()
                                    .set('Authorization',  `Bearer ${this.jwtToken}`);
    return this.http.get(`${this.baseUrl}/downloadFile?fileId=${fileId}`, { headers, responseType: 'blob'});
  }
  //update
  updateApp(app:AppointmentRegister): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateAppointment/`, app, this.header);
  }

  //delete
  deleteApp(id: string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/deleteAppById/${id}`, this.header);
  }

}
