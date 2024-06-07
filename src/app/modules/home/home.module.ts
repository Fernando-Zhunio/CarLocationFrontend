import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './pages/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
  ]
})
export class HomeModule { }
