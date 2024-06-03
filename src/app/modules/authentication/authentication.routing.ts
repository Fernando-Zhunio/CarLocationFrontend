import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { LoginComponent } from '@abp/ng.account';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes = [
  {
    path: 'login',
    component: LoginComponent
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
