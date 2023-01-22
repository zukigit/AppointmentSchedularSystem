import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
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

  constructor(private http:HttpClient) { 
    this.socket$ = webSocket('ws://localhost:8080/ws');
    this.socket$.subscribe(
      (message)=> {
        if(message.type === 'new_data'){
          this.count = message.count;
          this.countSubject.next(this.count);
        }
      },
      (err) => console.log(err),
      () => console.log('complete')
    );
   }

  private baseUrl = `http://localhost:8080/api/v1`;

  getNoti(id : string){
    return this.http.get(`http://localhost:8080/api/v1/getNoti/${id}`,this.header);
  }

  // async fetchNotification(id : string){
  //   try{
  //     const {count} = await this.http.get<{count:number}>
  //   (`http://localhost:8080/api/v1/getNoti/${id}`,this.header).toPromise();
  //   this.notificationCountSource.next(count);
  //   }catch(error){
  //     console.error(error);
  //   }
  // }
}
