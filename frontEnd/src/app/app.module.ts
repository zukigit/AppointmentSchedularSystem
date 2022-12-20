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
import { filter } from 'rxjs/operators';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user_role/user/user.component';
import { TraineeComponent } from './trainee_role/trainee/trainee.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';

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
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    UserComponent,
    TraineeComponent,
    PagenotfoundComponent,
    RegisterComponent,
  ],
  providers: [AdminAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
