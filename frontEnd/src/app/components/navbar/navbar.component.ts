import { Component, OnInit, ElementRef } from '@angular/core';
// import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { NotiService } from 'app/services/noti.service';
import { ShowAppointment } from 'app/model/show-appointment';
import { User } from 'app/model/user';
import { Subject, Subscription, switchMap, timer } from 'rxjs';
import { NotiModel } from 'app/model/noti-model';
// import { NotiModel } from 'app/model/noti-model';



declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES = [
    // { path: 'admin/user-profile', component: UserProfileComponent },
    { path: '#', title: 'Log Out', icon: 'logout', class: '' },



];
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    // menuItems: any[];
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    appointment: ShowAppointment = new ShowAppointment();

    bindData: any[] = [];
    temData: any;
    readedNoti: number;

    // notificationCount$ = this.notiService.notificationCount$;

    constructor(location: Location, private element: ElementRef, private router: Router, private notiService: NotiService) {
        this.location = location;
        this.sidebarVisible = false;


    }
    notiModel: NotiModel;
    dataByNoti: any = [];
    Notis: any
    notiArray: any[];
    loginId: string;
    user: User = new User();
    text: string;
    showData: any[] = [];

    unreadNoti: number;

    realTimeDataSubscription$: Subscription;


    ngOnInit() {
        this.unreadNoti = Number(localStorage.getItem("unreadNoti"));
        this.loginId = localStorage.getItem("loggedInUserId");
        this.readedNoti = Number(localStorage.getItem("totalNoti"));
        setTimeout(() => {
            this.getNotiFirstTime();

        }, 1200);

        setTimeout(() => {
            this.realTimeData();
        }, 1000);
        this.getNotiFirstTime();
        this.realTimeData();
        //  this.getNotiByType();

        console.log(this.bindData)

        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
    }

    removeReadCount() {
        localStorage.setItem("unreadNoti", '0');
        this.unreadNoti = 0;

        this.getNotiFirstTime()
    }

    realTimeData() {
        this.realTimeDataSubscription$ = timer(0, 100)
            .pipe(switchMap(_ => this.notiService.getNoti(this.loginId)))
            .subscribe(res => {
                this.temData = res;
                if (this.temData.length > this.readedNoti) {
                    this.unreadNoti = this.temData.length - this.readedNoti;
                    this.bindData.push(res);
                    this.readedNoti = this.temData.length;
                    localStorage.setItem("unreadNoti", `${this.unreadNoti}`);
                    localStorage.setItem("totalNoti", `${this.readedNoti}`);
                }
            });
    }

    getNotiFirstTime() {
        this.notiService.getNoti(this.loginId).subscribe(
            (data) => {
                let mydata;

                console.log("data" + data);
                // mydata=
                mydata = data;
                // mydata=data
                for (var noti of mydata) {
                    if
                        (noti.notiType == "CREATE_APP") {
                        this.showData.push(noti.createUser.name + " created the appointment :" + noti.title)
                        // console.log("create app " + this.showData)
                    }
                    else if (noti.notiType == "EDIT_APP") {
                        this.showData.push(noti.createUser.name + " edited the appointment :" + noti.title );
                    }
                    else if (noti.notiType == "DELETE_APP") {
                        this.showData.push(noti.createUser.name + " deleted the appointment :" + noti.title);
                    }
                    else if(noti.notiType == "USER_REMOVED" && noti.employee_id == this.loginId){
                        this.showData.push("You are removed from the appointment!");
                    }
                    else if(noti.notiType == "USER_ADD" && noti.employee_id == this.loginId){
                        this.showData.push("You are added the appointment :" + noti.title);
                    }
                }
                for (let x of this.bindData) {
                    // console.log(x + "data")
                    // x = this.bindData

                }
                this.bindData.push(this.showData)
                this.bindData = this.showData.map(data=>data)
               
                // console.log(this.bindData.length + "length")
            }
        )
    }

    goToDashboard() {
        this.router.navigate(['admin/dashboard'])
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }
    logout() {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("listbox");
        localStorage.removeItem("loggedInUserId");
        localStorage.removeItem("loggedInUserRole");

        this.router.navigate(['/login']).then(() => {
            window.location.reload();
        });
    }
}