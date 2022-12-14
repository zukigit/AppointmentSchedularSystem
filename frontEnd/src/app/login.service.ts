import { Injectable } from '@angular/core';
import { Login } from './login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = "http://localhost:8080";
  constructor(private loginService: HttpClient) {
      
  }

  loginUser(login: Login): Observable<object> {
    return this.loginService.post(this.baseUrl + '/auth', login);
  }
}
