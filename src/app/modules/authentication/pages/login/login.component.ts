import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form = new FormGroup({
    username: new FormControl('admin', [Validators.required]),
    password: new FormControl('Fernando1991.', [Validators.required]),
    rememberMe: new FormControl(false)
  });

  constructor(private authService: AuthService, private router: Router) {}
  
  saveInServer() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.authService.login(this.form.value as any).subscribe();
  }
}
