import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, guestGuard } from './shared/guards/auth.guard';
import { DefaultLayoutComponent } from './core/layouts/default-layout/default-layout.component';

const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  // },
  // {
  //   path: 'account',
  //   loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
  // },
  // {
  //   path: 'identity',
  //   loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
  // },
  // {
  //   path: 'tenant-management',
  //   loadChildren: () =>
  //     import('@abp/ng.tenant-management').then(m => m.TenantManagementModule.forLazy()),
  // },
  {
    path: 'authentication',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule),
    canActivate: [guestGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'cars',
        loadChildren: () => import('./modules/cars/car.module').then(m => m.CarModule),
      }
    ],
  },
  // {
  //   path: '**',
  //   redirectTo: 'home',
  // }
  // {
  //   path: 'setting-management',
  //   loadChildren: () =>
  //     import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
