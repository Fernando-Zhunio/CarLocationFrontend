import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isHiddenPassword = true;
  isLoading = false;
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    emailAddress: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}
  saveInServer() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.authService.register(this.form.value as any).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe(() => {});

  }
}
