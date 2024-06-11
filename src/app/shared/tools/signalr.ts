import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

export class SignalR {
  hubConnection: signalR.HubConnection;

  connection(accessToken: string) {
    // const connection = new signalR.HubConnectionBuilder()
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.apis.default.url + '/signalling', {
        accessTokenFactory() {
          return accessToken;
        },
        withCredentials: true
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection.onclose(async () => {
      await this.start();
    });

    this.start();
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

  sendMessage(message: any) {
   return this.hubConnection.invoke('SendMessage', 'fernando', message);
  }


  listener(onMethod: string, onCallback: (user: any, message: any) => void) {
      this.hubConnection.on(onMethod, onCallback);
  }


}
