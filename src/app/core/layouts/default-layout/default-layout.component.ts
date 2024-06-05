import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent  {

  constructor(
    private authService: AuthService
  ) {}
}
