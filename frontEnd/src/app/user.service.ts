import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private baseUrl = `http://localhost:8080/api`;

  getAllData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAll`)
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
