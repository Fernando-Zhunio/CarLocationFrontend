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
  sendDataChannel: RTCDataChannel;
  receivedDataChannel: RTCDataChannel;

  constructor(private signalrService: SignalRService, private snackbar: MatSnackBar) {
    this.peerConnection = new RTCPeerConnection(this.pc_config);
  }

  generateChannelForMessages() {
    this.sendDataChannel = this.peerConnection.createDataChannel('car-location');
    this.sendDataChannel.onopen = () => {
      console.log('onopen');
    };
    this.sendDataChannel.onclose = () => {
      console.log('onclose');
    };
  }

  getPeerConnection() {
    return this.peerConnection || new RTCPeerConnection(this.pc_config);
  }

  setConfig(config) {
    this.pc_config = config;
  }

  async createOffer() {
    try {
      const peerConnection = this.getPeerConnection();
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      this.signalrService.sendMessage('OfferMessage', offer);
    } catch (error) {
      console.error(error);
    }
  }

  async createAnswer(sdp: RTCSessionDescriptionInit) {
    try {
      const peerConnection = this.getPeerConnection();
      await peerConnection.setRemoteDescription(sdp);
      let sdpAnswer = await peerConnection.createAnswer();
      peerConnection.setLocalDescription(sdpAnswer);
      this.signalrService.sendMessage('AnswerMessage', sdpAnswer);
    } catch (error) {
      console.error(error);
    }
  }

  handlerCandidate() {
    this.peerConnection.onicecandidate = e => {
      debugger
      if (e.candidate) {
        console.log('onicecandidate', e);
        this.signalrService.sendMessage('CandidateMessage', e.candidate);
      }
    };
    this.peerConnection.oniceconnectionstatechange = e => {
      console.log('oniceconnectionstatechange', e);
    };
  }

  setCandidate(candidate) {
    this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).then(() => {
      console.log('candidate add success');
    });
  }

  onMessageCarLocation(callback: (_this: RTCDataChannel, ev: MessageEvent<any>) => any) {
    this.getPeerConnection().ondatachannel = ((peerConnection: RTCPeerConnection, event: RTCDataChannelEvent) => {
      this.receivedDataChannel = event.channel;
      this.receivedDataChannel.onmessage = callback as any;
      this.receivedDataChannel.onopen = (() => {
        console.log('onopen');
      }) as any;
      this.receivedDataChannel.onclose = (() => {
        console.log('onclose');
      })
    }) as any;
  }

  sendMessage(message: any) {
    debugger
    this.sendDataChannel.send(message);
    console.log('Sent Data: ' + message);
  }

  getDataChannel() {
    return this.sendDataChannel;
  }
}
