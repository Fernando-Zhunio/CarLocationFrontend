import { Injectable } from '@angular/core';
import { EventBusService } from './event-bus.service';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  slugLogoutEvent = 'logout';

  isAuth = false;
  constructor() {
    EventBusService.on(this.slugLogoutEvent, () => {
      this.isAuth = false
    })
  }

  setAuth(isAuth: boolean) {
    this.isAuth = isAuth
  }
}
