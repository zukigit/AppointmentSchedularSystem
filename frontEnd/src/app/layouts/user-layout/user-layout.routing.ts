import { Routes } from '@angular/router';
import { DashboardComponent } from '../../admin_role/dashboard/dashboard.component';
import { UserProfileComponent } from '../../admin_role/user-profile/user-profile.component';
import { TableListComponent } from '../../admin_role/table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { UserComponent } from 'app/user_role/user/user.component';
import { TraineeComponent } from 'app/trainee_role/trainee/trainee.component';
import { AdminAuthGuard } from 'app/security/admin-auth.guard';
import { RegisterComponent } from 'app/register/register.component';
import { UpdateComponent } from 'app/update/update.component';
import { ChangePassComponent } from 'app/admin_role/change-pass/change-pass.component';
import { AppointmentComponent } from 'app/appointment/appointment.component';
import { AppRegisterComponent } from 'app/app-register/app-register.component';
import { DailyviewComponent } from 'app/dailyview/dailyview.component';
import { WeeklyviewComponent } from 'app/weeklyview/weeklyview.component';
import { UserAuthGuard } from 'app/security/user-auth.guard';
import { TraineeAuthGuard } from 'app/security/trainee-auth.guard';
import { AppRegisterbyuserComponent } from 'app/app-registerbyuser/app-registerbyuser.component';

export const UserLayoutRoutes: Routes = [
            { path: 'dashboard', component: DashboardComponent, canActivate:[UserAuthGuard]},
            { path: 'user-profile', component: UserProfileComponent, canActivate:[UserAuthGuard]},
            { path: 'notifications', component: NotificationsComponent,canActivate:[UserAuthGuard] },
            { path: 'change_pass',component:ChangePassComponent, canActivate:[UserAuthGuard]},
            { path: 'app-registerbyuser',component:AppRegisterbyuserComponent,canActivate:[UserAuthGuard]},
            { path: 'dailyview', component: DailyviewComponent,canActivate:[UserAuthGuard]},
            { path: 'weeklyview', component: WeeklyviewComponent,canActivate:[UserAuthGuard]},
            //{ path: 'test', component: UserComponent, canActivate:[UserAuthGuard]},
];
