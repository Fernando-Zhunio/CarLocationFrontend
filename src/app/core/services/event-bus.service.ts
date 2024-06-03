import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  constructor() { }

  public static emit(eventName: string, detail?: any) {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
  }

  public static on(eventName: string, callback: any) {
    window.addEventListener(eventName, callback);
  }

  public static off(eventName: string, callback: any) {
    window.removeEventListener(eventName, callback);
  }

  public static once(eventName: string, callback: any) {
    window.addEventListener(eventName, callback, { once: true });
  }

}
