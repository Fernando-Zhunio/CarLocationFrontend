import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from '../home/home.routing';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from '../home/pages/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from 'src/environments/environment';
import { CarIndexComponent } from './pages/car-index/car-index.component';
import { CarRoutingModule } from './car.routing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CarIndexComponent
  ],
  imports: [
    CommonModule,
    CarRoutingModule,
    RouterModule,
    FormsModule,
    // Material
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.apis.mapbox.token,
    })
  ]
})
export class CarModule { }
