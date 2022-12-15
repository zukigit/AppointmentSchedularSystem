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
<<<<<<< HEAD
import { filter } from 'rxjs/operators';
=======
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { TraineeComponent } from './trainee/trainee.component';
>>>>>>> a28421a15d3785aef087bc57366bdcdbf40386df

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
