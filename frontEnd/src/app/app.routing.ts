import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginAuthGuard } from './security/login-auth.guard';
import { AdminAuthGuard } from './security/admin-auth.guard';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { TraineeLayoutComponent } from './layouts/trainee-layout/trainee-layout.component';


const routes: Routes =[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [{
              path: 'admin',
              component:AdminLayoutComponent,
              loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
                },
              {
                path: 'user',
                component:UserLayoutComponent,
                loadChildren: () => import('./layouts/user-layout/user-layout.module').then(m => m.UserLayoutModule)
                },
              {
                path: 'trainee',
                component:TraineeLayoutComponent,
                loadChildren: () => import('./layouts/trainee-layout/trainee-layout.module').then(m => m.TraineeLayoutModule)
                },
              ]
  },
  { path: 'login', component: LoginComponent, canActivate:[LoginAuthGuard]},
  { path: '**', component: PagenotfoundComponent }
];



// const routes: Routes = [
//   {
//     path: '',
//     children: [
      

//       {
//         path: 'login',
//         component: LoginComponent,
//         canActivate:[LoginAuthGuard]
//       }
//     ]
//   },
//   {
//     path: 'admin',
//     canLoad: [AdminAuthGuard],
//     canActivate: [AdminAuthGuard],
//     data: {
//       roles: [
//         role.Admin,
//       ]
//     },
//     loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
//   },
//   {
//     path: '**',
//     component: NotFoundComponent
//   }
// ];


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
