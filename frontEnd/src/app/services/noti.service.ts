import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class NotiService {

  private count = 0;
  private countSubject = new Subject<number>();
  count$ = this.countSubject.asObservable();
  private socket$ : WebSocketSubject<any>;

  private notificationCountSource = new BehaviorSubject<number>(0);
  notificationCount$ = this.notificationCountSource.asObservable();

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

  getTotalNotiCount(userId : string) {
    return this.http.get(`${this.baseUrl}/getTotalNoti/${userId}`,this.header);
  }

  getUnreadedNotiCount(userId : string) {
    return this.http.get(`${this.baseUrl}/getUnreadNoti/${userId}`,this.header);
  }

  makeNotiReaded(notiId : number) {
    console.log("noti make is called")
    return this.http.put(`${this.baseUrl}/makeReaded/${notiId}`,this.header);
  }
}
