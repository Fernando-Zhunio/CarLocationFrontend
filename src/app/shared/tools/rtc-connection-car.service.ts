import { Injectable } from '@angular/core';
import { SignalRService } from './signalr.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReceiveMessagesSlugs, SendMessagesSlugs } from './const-rtc';
import { Logger } from './common-tools';

@Injectable({
  providedIn: 'root',
})
export class RtcConnectionCarService {
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

  constructor(private signalrService: SignalRService,) {
    this.peerConnection = new RTCPeerConnection(this.pc_config);
  }

  // createChannelForMessages() {
  //   this.sendDataChannel = this.peerConnection.createDataChannel('car-location');
  //   this.sendDataChannel.onopen = () => {
  //     console.log('onopen');
  //   };
  //   this.sendDataChannel.onclose = () => {
  //     console.log('onclose');
  //   };
  //   this.sendDataChannel.onmessage = e => {
  //     console.log('onmessage', e);
  //   };
  // }

  getPeerConnection() {
    return this.peerConnection;
  }

  // async createOffer() {
  //   try {
  //     const peerConnection = this.getPeerConnection();
  //     const offer = await peerConnection.createOffer();
  //     await peerConnection.setLocalDescription(offer);
  //     this.signalrService.sendMessage(SendMessagesSlugs.Offer, offer);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async communicationOtherServer() {
    const peerConnection = this.getPeerConnection();
    
    //#region Onicecandidate
    peerConnection.onicecandidate = e => {
      Logger.log('onicecandidate');
      if (e.candidate) {
        Logger.log('onicecandidate');
        this.signalrService.sendMessage(SendMessagesSlugs.Candidate, e.candidate);
      }
    };
    peerConnection.oniceconnectionstatechange = e => {
      console.log('oniceconnectionstatechange', e);
    };
    //#endregion

    //#region CreateDataChannel
    this.sendDataChannel = this.peerConnection.createDataChannel('car-location');
    this.sendDataChannel.onopen = () => Logger.log('onopen');
    this.sendDataChannel.onclose = () => Logger.log('onclose');
    this.sendDataChannel.onmessage = e => Logger.log('onmessage');
    //#endregion

    //#region CreateOffer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    this.signalrService.sendMessage(SendMessagesSlugs.Offer, offer);
    //#endregion

    //#region OnAnswer
    this.signalrService.on(ReceiveMessagesSlugs.Answer, (sdp: any, deviceId: string) => {
      console.log('GetAnswer', { sdp, deviceId: deviceId });
      peerConnection.setRemoteDescription(sdp);
    });
    //#endregion

    //this.listenerCandidate();
    //this.createChannelForMessages();
    //await this.createOffer();
    //this.listenerAnswer();
  }

  // listenerAnswer() {
  //   this.signalrService.on(ReceiveMessagesSlugs.Answer, (sdp: any, deviceId: string) => {
  //     console.log('GetAnswer', { sdp, deviceId: deviceId });
  //     this.getPeerConnection().setRemoteDescription(sdp);
  //   });
  // }

  // listenerCandidate() {
  //   this.getPeerConnection().onicecandidate = e => {
  //     debugger;
  //     console.log('onicecandidate', e);
  //     if (e.candidate) {
  //       console.log('onicecandidate', e);
  //       this.signalrService.sendMessage(SendMessagesSlugs.Candidate, e.candidate);
  //     }
  //   };
  //   this.getPeerConnection().oniceconnectionstatechange = e => {
  //     debugger;
  //     console.log('oniceconnectionstatechange', e);
  //   };
  // }
}
