import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { GetKeyApp, GetToken } from './common-tools';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  initializationSignalling() {
    if (this.hubConnection) {
      return;
    }
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.apis.default.url + '/signalling', {
        accessTokenFactory() {
          return GetToken();
        },
        withCredentials: true,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection.onclose(async () => {
      await this.start();
    });
    return new Promise((resolve, reject) => {
      this.start().then(() => resolve(this.hubConnection))
      .catch(() => reject());
    });
  }

  async start() {
    try {
      await this.hubConnection.start();
      console.log('SignalR Connected.');
    } catch (err) {
      console.log(err);
      setTimeout(this.start, 5000);
    }
  }

  sendMessage(method: string, message: any) {
    const id = localStorage.getItem('key_id');
    return this.hubConnection.invoke(method, message, GetKeyApp());
  }

  listener(onMethod: string, onCallback: (user: any, message: any) => void) {
    this.hubConnection.on(onMethod, onCallback);
  }
}
