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
import { LoginAuthGuard } from './security/login-auth.guard';

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
    DatePipe
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
  ],
  providers: [AdminAuthGuard, DatePipe, LoginAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
