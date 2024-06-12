import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/shared/tools/signalr.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'car-index',
  templateUrl: './car-index.component.html',
  styleUrl: './car-index.component.scss'
})
export class CarIndexComponent implements OnInit {
  offer: any = null
  constructor(private signalrService: SignalRService) {}

  ngOnInit(): void {
    this.handlerOffer();
  }
  handlerOffer() {
    this.signalrService.listener('GetOffer', (sdp, idApp) => {
      console.log('GetOffer',{ sdp, idApp });
      this.offer = { sdp, idApp };
    });
  }
}
