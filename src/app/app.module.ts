import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './core/services/auth.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { DefaultInterceptorService } from './core/interceptors/default-interceptor.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CoreService } from './core/services/core.service';

function initializeApp(coreService: CoreService): () => Observable<any> {
  return () => coreService.verifiedAuth().pipe(
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
      deps: [CoreService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DefaultInterceptorService,
      multi: true,
    },
    provideNativeDateAdapter(),
  ]
})
export class AppModule {}
