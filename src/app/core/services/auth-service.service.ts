import { Injectable } from '@angular/core';
import { EventBusService } from './event-bus.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';


export interface ILoginRequest {
  // grant_type: string,
  // scope: string,
  // client_id: string,
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

  user: any = null

  token: string | null = null
  constructor(private http: HttpService, private router: Router) { 
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

  getToken() {
    return this.token || localStorage.getItem('access_token') || null;
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
      map((res) => {
        localStorage.setItem('access_token', res['access_token']);
        this.token = res['access_token'];
        AuthService.isAuth = true
      })
    );
  }

  logout() {
    return this.http.get('connect/logout').pipe(
      tap((res) => {
        localStorage.removeItem('access_token');
        this.token = null;
        AuthService.isAuth = false
        this.router.navigate(['authentication/login'])
      })
    )
  }

  verifiedAuth() {
    if (this.getToken()) {
      return this.http.get('api/app/test/user')
      .pipe(
        map((res) => {
          console.log(res)
          AuthService.isAuth = true
          this.user = res
          this.router.navigate([this.redirectAuthUrl])
          return res
        }),
        catchError((error) => {
          console.log(error)
          AuthService.isAuth = false
          this.user = null
          this.router.navigate([this.redirectGuestUrl])
          return of(null)
        })
      )
    } else {
      this.router.navigate([this.redirectGuestUrl])
      return of(null)
    }
  }

}
