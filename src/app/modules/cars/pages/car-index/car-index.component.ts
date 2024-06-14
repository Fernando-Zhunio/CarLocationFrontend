import { Component, OnInit } from '@angular/core';
import { RtcConnectionMapService } from 'src/app/shared/tools/rtc-connection-map.service';
// import { RtcConnectionService } from 'src/app/shared/tools/rtc-connection.service';
// import { SignalRService } from 'src/app/shared/tools/signalr.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'car-index',
  templateUrl: './car-index.component.html',
  styleUrl: './car-index.component.scss',
})
export class CarIndexComponent implements OnInit {
  offer: any = null;
  constructor(
    // private signalrService: SignalRService,
    private rtcConnectionService: RtcConnectionMapService
  ) {}

  ngOnInit(): void {
    this.rtcConnectionService.communicationOtherServer();
  }

  message: string = '';

  sendMessage() {
    this.rtcConnectionService.sendMessage(this.message);
  }
}
