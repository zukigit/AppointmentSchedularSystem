import { Injectable } from '@angular/core';
import { Login } from './login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = "http://localhost:8080/login";

  constructor(private loginService: HttpClient) {

  }

  loginUser(login: Login): Observable<object> {
    console.log(login);
    return this.loginService.post(`${this.baseUrl}`, login);
  }
}
