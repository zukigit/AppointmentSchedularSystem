import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {MatRadioModule} from '@angular/material/radio';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user_role/user/user.component';
import { TraineeComponent } from './trainee_role/trainee/trainee.component';
import { AdminAuthGuard } from './security/admin-auth.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';
import { UpdateComponent } from './update/update.component';
import { ChangePassComponent } from './admin_role/change-pass/change-pass.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppRegisterComponent } from './app-register/app-register.component';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { DatePipe } from '@angular/common';
import { DailyviewComponent } from './dailyview/dailyview.component';
import { WeeklyviewComponent } from './weeklyview/weeklyview.component';
import { NotifierModule,NotifierService } from 'angular-notifier';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { UserAuthGuard } from './security/user-auth.guard';
import { TraineeAuthGuard } from './security/trainee-auth.guard';
import { CommonModule } from '@angular/common';
import { TesingComponent } from './tesing/tesing.component';
import { AppointmentDetailViewComponent } from './appointment-detail-view/appointment-detail-view.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { TraineeLayoutComponent } from './layouts/trainee-layout/trainee-layout.component';
//import { UsernavComponent } from './user_role/usernav/usernav.component';
//import { TraineenavComponent } from './trainee_role/traineenav/traineenav.component';
import { TraineesidebarComponent } from './trainee_role/traineesidebar/traineesidebar.component';
import { UsersidebarComponent } from './user_role/usersidebar/usersidebar.component';
import { UsernavbarComponent } from './user_role/usernavbar/usernavbar.component';
import { TraineenavbarComponent } from './trainee_role/traineenavbar/traineenavbar.component';
import { AppRegisterbyuserComponent } from './app-registerbyuser/app-registerbyuser.component';
import { DailyviewbyuserComponent } from './dailyviewbyuser/dailyviewbyuser.component';
import { DailyviewbytraineeComponent } from './dailyviewbytrainee/dailyviewbytrainee.component';
import { WeeklyviewbyuserComponent } from './weeklyviewbyuser/weeklyviewbyuser.component';
import { WeeklyviewbytraineeComponent } from './weeklyviewbytrainee/weeklyviewbytrainee.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatRadioModule,
    FullCalendarModule,
    AngularDualListBoxModule,
    DatePipe,
    NotifierModule,
    MatFormFieldModule,
    CommonModule

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    UserComponent,
    TraineeComponent,
    PagenotfoundComponent,
    RegisterComponent,
    UpdateComponent,
    ChangePassComponent,
    AppointmentComponent,
    AppRegisterComponent,
    DailyviewComponent,
    WeeklyviewComponent,
    TesingComponent,
    AppointmentDetailViewComponent,
    UserLayoutComponent,
    TraineeLayoutComponent,
    //UsernavComponent,
    //TraineenavComponent,
    TraineesidebarComponent,
    UsersidebarComponent,
    UsernavbarComponent,
    TraineenavbarComponent,
    AppRegisterbyuserComponent,
    DailyviewbyuserComponent,
    DailyviewbytraineeComponent,
    WeeklyviewbyuserComponent,
    WeeklyviewbytraineeComponent,
  ],
  providers: [AdminAuthGuard, DatePipe, UserAuthGuard, TraineeAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
