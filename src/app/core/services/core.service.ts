import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GET_USER_INFO_ENDPOINT } from 'src/app/modules/authentication/endpoints/authentication.endpoints';
import { HttpService } from 'src/app/shared/services/http.service';
import { GetToken } from 'src/app/shared/tools/common-tools';
import { SignalRService } from 'src/app/shared/tools/signalr.service';
import { IUser } from '../types/user';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from './auth.service';
import { FastInfo } from '../helpers/fastInfo';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  redirectGuestUrl = 'authentication/login';


  constructor(
    private signalRService: SignalRService,
    private router: Router,
    private http: HttpService
  ) {}

  async initializationIfAuth() {
     await this.signalRService.initializationSignalling();
  }

  verifiedAuth() {
    if (GetToken()) {
      return this.http.get(GET_USER_INFO_ENDPOINT)
      .pipe(
        mergeMap(async (res: IUser) => {
          AuthService.isAuth = true
          FastInfo.Instance.setUser(res);
          await this.initializationIfAuth();
          return res
        }),
        catchError((error) => {
          AuthService.isAuth = false;
          FastInfo.Instance.setUser(null)
          localStorage.removeItem('access_token')
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
