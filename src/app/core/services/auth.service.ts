import { Injectable } from '@angular/core';
import { EventBusService } from './event-bus.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from '../types/user';
import { GET_USER_INFO_ENDPOINT } from 'src/app/modules/authentication/endpoints/authentication.endpoints';
import { GetToken } from 'src/app/shared/tools/common-tools';
import { FastInfo } from '../helpers/fastInfo';
import { CoreService } from './core.service';


export interface ILoginRequest {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static isAuth = false;
  slugLogoutEvent = 'logout';

  redirectAuthUrl = '/'
  redirectGuestUrl = 'authentication/login'

  user: IUser | null = null
  
  constructor(private http: HttpService, private router: Router, private coreService: CoreService) { 
    EventBusService.on(this.slugLogoutEvent, () => {
      console.log('logout')
      this.logout()
    })
  }

  static setAuth(value: boolean) {
    this.isAuth = value;
  }

  static getAuth(): boolean {
    return this.isAuth;
  }

  login(body: ILoginRequest) {
    const request = new URLSearchParams();
    request.set('grant_type', 'password');
    request.set('scope', 'CarLocation');
    request.set('client_id', 'CarLocation_App');
    request.set('username', body.username);
    request.set('password', body.password);
    return this.http.post('connect/token', request, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).pipe(
      mergeMap((res) => {
        localStorage.setItem('access_token', res['access_token']);
        //AuthService.isAuth = true
        return this.coreService.verifiedAuth();
      }),
    );
  }

  logout() {
    return this.http.get('connect/logout').pipe(
      tap((res) => {
        localStorage.removeItem('access_token');
        AuthService.isAuth = false
        this.router.navigate(['authentication/login'])
      })
    )
  }

  

  register(body: any){
    return this.http.post('api/Account/Register', {...body, appName: 'CarLocation'}).pipe(
      mergeMap((res) => {
        return this.login(body)
      })
    )
  }

  getUser() {
    return this.user
  }

}
