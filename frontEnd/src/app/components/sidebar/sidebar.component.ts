import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'admin/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: 'admin/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: 'admin/user-details', title: 'User Details',  icon:'content_paste', class: '' }
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  goToAppRegister() {
    this.router.navigate(['/app-register'])
  }
}
