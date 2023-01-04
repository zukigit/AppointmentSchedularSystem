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

  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.jwtHelper.isTokenExpired(this.token)) {
        return true;
      } else {
        this.router.navigate(['/admin/dashboard']).then(()=>{
          window.location.reload();
        }); 
      }
  }
}
