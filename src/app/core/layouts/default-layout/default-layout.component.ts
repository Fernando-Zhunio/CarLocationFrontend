import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { IUserCurrent } from '../../types/user';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
})
export class DefaultLayoutComponent {
  user!: IUserCurrent;
  constructor(private authService: AuthService) {
    this.user = this.authService.getUser();
  }
}
