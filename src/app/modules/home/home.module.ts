import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './pages/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,

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
export class HomeModule { }
