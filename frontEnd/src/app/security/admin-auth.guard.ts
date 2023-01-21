import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  userRole: string = localStorage.getItem("loggedInUserRole");
  token: string = localStorage.getItem("jwtToken");
  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.userRole == "ROLE_ADMIN" && !this.jwtHelper.isTokenExpired(this.token)) {
        return true;
      } else {
        alert("log in again");
        localStorage.clear();  
        this.router.navigate(['/login']).then(()=>{
          window.location.reload();
        }); 
      }
  }
  
}
