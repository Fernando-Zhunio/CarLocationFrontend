import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  static isAuth = false;
  token: string | null = null
  constructor() { }

  static setAuth(value: boolean) {
    this.isAuth = value;
  }

  static getAuth(): boolean {
    return this.isAuth;
  }

  getToken() {
    return this.token || localStorage.getItem('access_token') || null;
  }

}
