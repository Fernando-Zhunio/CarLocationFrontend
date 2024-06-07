import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { GET_CARS_ENDPOINT } from '../../endpoints/car.endpoints';
import { IResponsePaginator } from 'src/app/core/types/response';
import { ICar } from 'src/app/core/types/car';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

 cars: ICar[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {


    this.getCars();
  }

  getCars() {
    return this.httpService.get<IResponsePaginator<any>>(GET_CARS_ENDPOINT).subscribe({
      next: (response) => {
        this.cars = response.items;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


}
