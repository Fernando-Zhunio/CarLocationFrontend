import { Component, OnInit } from '@angular/core';
import { RtcConnectionService } from 'src/app/shared/tools/rtc-connection.service';
import { SignalRService } from 'src/app/shared/tools/signalr.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'car-index',
  templateUrl: './car-index.component.html',
  styleUrl: './car-index.component.scss',
})
export class CarIndexComponent implements OnInit {
  offer: any = null;
  constructor(
    private signalrService: SignalRService,
    private rtcConnectionService: RtcConnectionService
  ) {}

  ngOnInit(): void {
    this.handlerOffer();
    this.signalrService.listener('GetCandidate', (sdp, _deviceId) => {
      console.log('GetCandidate', { sdp, _deviceId });
      debugger
      this.rtcConnectionService.setCandidate(sdp);
    });
    this.rtcConnectionService.generateChannelForMessages();
    this.rtcConnectionService.handlerCandidate();
  }

  handlerOffer() {
    this.signalrService.listener('GetOffer', (sdp, idApp) => {
      console.log('GetOffer', { sdp, idApp });
      this.offer = { sdp, idApp };
      this.rtcConnectionService.createAnswer(sdp);
    });
  }

  message: string = '';

  sendMessage() {
    this.rtcConnectionService.sendMessage(this.message);
  }
}
