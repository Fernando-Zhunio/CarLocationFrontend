import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarIndexComponent } from './pages/car-index/car-index.component';

const routes = [
  {
    path: ':id',
    component: CarIndexComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class CarRoutingModule { }
