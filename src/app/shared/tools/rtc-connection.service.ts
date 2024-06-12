import { Injectable } from '@angular/core';
import { SignalRService } from './signalr.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class RtcConnectionService {
  pc_config = {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  };
  peerConnection: RTCPeerConnection;

  constructor(private signalrService: SignalRService, private snackbar: MatSnackBar) {
  }

  init() {
      this.peerConnection = new RTCPeerConnection(this.pc_config);
      this.createOffer();
    // this.signalrService.initializationSignalling().then(() => {
    // });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  setConfig(config) {
    this.pc_config = config;
  }

  createOffer() {
    return new Promise((resolve, reject) => this.peerConnection.createOffer({})
    .then(offer => {
      this.peerConnection.setLocalDescription(offer);
      console.log({offer});
      this.snackbar.open('Offer created', 'Close', {duration: 3000});
      this.signalrService.sendMessage('OfferMessage', offer);
      resolve(offer);
    }).catch(error => reject(error)));
  }
}
