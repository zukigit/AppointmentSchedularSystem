import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {
  token: string = localStorage.getItem("jwtToken");
  jwtHelper: JwtHelperService = new JwtHelperService();
  userRole: string = localStorage.getItem("loggedInUserRole");

  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.userRole == "ROLE_ADMIN" && !this.jwtHelper.isTokenExpired(this.token)) {
      this.router.navigate(['/admin/dashboard']).then(()=>{
        window.location.reload();
      }); 
      }else if(this.userRole == "ROLE_USER" && !this.jwtHelper.isTokenExpired(this.token)) {
        this.router.navigate(['/user/test']).then(()=>{
          window.location.reload();
        }); 
      } else if(this.userRole == "ROLE_TRAINEE" && !this.jwtHelper.isTokenExpired(this.token)) {
        this.router.navigate(['/trainee/test']).then(()=>{
          window.location.reload();
        }); 
      } else {
        return true;
      }
  }
}
