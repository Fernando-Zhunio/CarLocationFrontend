import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { AuthService } from '../../services/auth-service.service';
import { IUserCurrent } from '../../types/user';
// import { AuthService as AuthServiceAbp } from '@abp/ng.core';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
})
export class DefaultLayoutComponent {
  user!: IUserCurrent;
  isLoading = false;
  constructor(private authService: AuthService) {
    this.user = this.authService.getUser();
  }

  logout() {
    // this.authServiceAbp.logout();
    return
    console.log('logout');
    if(this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.authService.logout().subscribe({
      next: () => {},
      error: (error) => {
        this.isLoading = false;
      }});
  }
}
