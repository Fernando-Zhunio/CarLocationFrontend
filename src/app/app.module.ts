import { AccountConfigModule } from '@abp/ng.account/config';
import { CoreModule } from '@abp/ng.core';
import { registerLocale } from '@abp/ng.core/locale';
import { IdentityConfigModule } from '@abp/ng.identity/config';
import { SettingManagementConfigModule } from '@abp/ng.setting-management/config';
import { TenantManagementConfigModule } from '@abp/ng.tenant-management/config';
import { ThemeLeptonXModule } from '@abp/ng.theme.lepton-x';
import { SideMenuLayoutModule } from '@abp/ng.theme.lepton-x/layouts';
import { InternetConnectionStatusComponent, ThemeSharedModule } from '@abp/ng.theme.shared';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_ROUTE_PROVIDER } from './route.provider';
import { FeatureManagementModule } from '@abp/ng.feature-management';
import { AbpOAuthModule } from '@abp/ng.oauth';
import { AccountLayoutModule } from '@abp/ng.theme.lepton-x/account';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './core/services/auth-service.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { DefaultInterceptorService } from './core/interceptors/default-interceptor.service';


function initializeApp(authService: AuthService): () => Observable<any> {
  return () => authService.verifiedAuth().pipe(
    tap((res) => {
      console.log({tap: res});
      document.getElementById('init-loader')?.remove();
    }),
    catchError((error) => {
      document.getElementById('init-loader')?.remove();
      console.log({catchError: error});
      //coreService.changeAppStatus(AppStates.GUEST,null);
      return of(() =>error);
    })
  );
}
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    // CoreModule.forRoot({
    //   environment,
    //   registerLocaleFn: registerLocale(),
    // }),
    // AbpOAuthModule.forRoot(),
    // ThemeSharedModule.forRoot(),
    // AccountLayoutModule.forRoot(),
    // AccountConfigModule.forRoot(),
    // IdentityConfigModule.forRoot(),
    // TenantManagementConfigModule.forRoot(),
    // SettingManagementConfigModule.forRoot(),
    // ThemeLeptonXModule.forRoot(),
    // SideMenuLayoutModule.forRoot(),
    // FeatureManagementModule.forRoot(),
    // InternetConnectionStatusComponent
  ],
  declarations: [AppComponent],
  // providers: [APP_ROUTE_PROVIDER, provideAnimationsAsync()],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [AuthService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DefaultInterceptorService,
      multi: true,
    },
  ]
})
export class AppModule {}
