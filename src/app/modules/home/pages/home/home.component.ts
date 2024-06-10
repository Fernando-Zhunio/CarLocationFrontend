import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { GET_CARS_ENDPOINT } from '../../endpoints/car.endpoints';
import { IResponseCreateOrEditDialog, IResponsePaginator } from 'src/app/core/types/response';
import { ICar } from 'src/app/core/types/car';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrEditCarDialogComponent } from 'src/app/modules/cars/create-or-edit-car-dialog/create-or-edit-car-dialog.component';
import * as signalR from '@microsoft/signalr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  cars: ICar[] = [];

  geolocationPosition: GeolocationPosition | undefined;

  constructor(private httpService: HttpService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCars();
    this.getCurrentPosition();
    this.connectionWebsocket();
  }

  getCurrentPosition() {
    // check if geolocation is supported on this browser
    if (navigator.geolocation) {
      const timeoutVal = 10 * 1000 * 1000; // set a timeout value for the query
      navigator.geolocation.getCurrentPosition(
        this.getCoordinatesCallback.bind(this),

        error => {
          // what to do if query fails:
          const errors = {
            1: 'Permission denied',
            2: 'Position unavailable',
            3: 'Request timeout',
          };

          alert('Error: ' + errors[error.code]); // print the error
        },
        // these 3 parameters are very important, especially the first one
        { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
      );
    } else {
      alert('Geolocation is not supported by this browser');
    }
  }

  getCoordinatesCallback(position: GeolocationPosition) {
    console.log({ position });
    this.geolocationPosition = position;
  }

  getCars() {
    return this.httpService.get<IResponsePaginator<any>>(GET_CARS_ENDPOINT).subscribe({
      next: response => {
        this.cars = response.items;
      },
      error: error => {
        console.log(error);
      },
    });
  }

  test(option: any) {
    console.log({ option });
  }

  openCreateOrEditDialog(id: string | null = null) {
    let data = null;
    if (id) {
      data = this.cars.find(x => x.id === id);
    }
    this.dialog
      .open(CreateOrEditCarDialogComponent, {
        data,
        minWidth: '400px',
      })
      .beforeClosed()
      .subscribe((result: IResponseCreateOrEditDialog<ICar>) => {
        if (result) {
          if (id) {
            const index = this.cars.findIndex(x => x.id === id);
            this.cars[index] = result.item;
          } else {
            this.cars.unshift(result.item);
          }
        }
      });
  }

  connectionWebsocket() {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('/messaging')
      .configureLogging(signalR.LogLevel.Information)
      .build();

    async function start() {
      try {
        await connection.start();
        console.log('SignalR Connected.');
      } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
      }
    }

    connection.onclose(async () => {
      await start();
    });

    // Start the connection.
    start();
  }
}
