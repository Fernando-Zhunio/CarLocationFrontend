import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { LoginComponent } from '@abp/ng.account';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthLayoutComponent } from './pages/layouts/auth-layout/auth-layout.component';
import { RegisterComponent } from './pages/register/register.component';

const routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  // {
  //   path: 'register',
  // }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
