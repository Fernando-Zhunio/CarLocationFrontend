import { Injectable } from '@angular/core';
import { SignalRService } from './signalr.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReceiveMessagesSlugs, SendMessagesSlugs } from './const-rtc';
import { Logger } from './common-tools';

@Injectable({
  providedIn: 'root',
})
export class RtcConnectionMapService {
  pc_config = {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  };

  peerConnection: RTCPeerConnection;
  sendDataChannel: RTCDataChannel;
  receivedDataChannel: RTCDataChannel;

  constructor(private signalrService: SignalRService, private snackbar: MatSnackBar) {
    this.peerConnection = new RTCPeerConnection(this.pc_config);
  }

  getPeerConnection() {
    return this.peerConnection;
  }

  communicationOtherServer() {
    //this.createChannel();
    try {
      const peerConnection = this.getPeerConnection();
      //#region onicecandidate
      peerConnection.onicecandidate = e => {
        if (e.candidate) {
          Logger.log('onicecandidate');
          this.signalrService.sendMessage(SendMessagesSlugs.Candidate, e.candidate);
        }
      };
      peerConnection.oniceconnectionstatechange = e => {
        Logger.log('oniceconnectionstatechange');
      };

      //#endregion

      //#region createDataChannel
      peerConnection.ondatachannel = e => {
        this.receivedDataChannel = e.channel;
        this.receivedDataChannel.onmessage = e => Logger.log(e);
        this.receivedDataChannel.onopen = () => Logger.log('onopen');
        this.receivedDataChannel.onclose = () => Logger.log('onclose');
      };
      //#endregion

      //#region OnCandidate
      this.signalrService.on(ReceiveMessagesSlugs.Candidate, (candidate: any) => {
        peerConnection.addIceCandidate(candidate);
      });

      //#region OnOffer
      this.signalrService.on(ReceiveMessagesSlugs.Offer, (sdp: any) => {
        peerConnection.setRemoteDescription(sdp);
        Logger.log({ info: 'GetOffer', sdp });
        this.createAnswer(sdp);
      });
    } catch (error) {
      Logger.log(error, 'error');
    }

    //#endregion
    //this.listenerDataChannel();
    //this.listenerCandidate();
    //this.listenerOfferAndCreateAnswer();
  }

  sendMessage(message: any) {
    // Crear un canal de datos
    this.receivedDataChannel.send(message);
  }

  listenerOfferAndCreateAnswer() {
    this.signalrService.on(ReceiveMessagesSlugs.Offer, (sdp: any) => {
      this.getPeerConnection().setRemoteDescription(sdp);
      console.log('GetOffer', sdp);
      this.createAnswer(sdp);
    });
  }

  listenerCandidate() {
    this.signalrService.on(ReceiveMessagesSlugs.Candidate, (candidate: any) => {
      debugger;
      this.getPeerConnection().addIceCandidate(candidate);
    });
  }

  listenerDataChannel() {
    this.getPeerConnection().ondatachannel = e => {
      this.receivedDataChannel = e.channel;
      this.receivedDataChannel.onmessage = e => {
        console.log('onmessage', e);
      };
      this.receivedDataChannel.onopen = () => {
        console.log('onopen');
      };
      this.receivedDataChannel.onclose = () => {
        console.log('onclose');
      };
    };
  }

  async createAnswer(sdp: RTCSessionDescriptionInit) {
    try {
      const peerConnection = this.getPeerConnection();
      await peerConnection.setRemoteDescription(sdp);
      let sdpAnswer = await peerConnection.createAnswer();
      peerConnection.setLocalDescription(sdpAnswer);
      this.signalrService.sendMessage(SendMessagesSlugs.Answer, sdpAnswer);
    } catch (error) {
      console.error(error);
    }
  }
}
