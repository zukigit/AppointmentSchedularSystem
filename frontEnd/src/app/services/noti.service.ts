import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotiService {

  jwtToken: string = localStorage.getItem("jwtToken");
  header = {
    headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${this.jwtToken}`)
  }

  constructor(private http:HttpClient) { }

  private baseUrl = `http://localhost:8080/api/v1`;

  getNoti(id : string){
    return this.http.get(`http://localhost:8080/api/v1/getNoti/${id}`,this.header);
  }
}
