import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form = new FormGroup({
    grant_type: new FormControl('password'),
    scope: new FormControl('CarLocation'),
    client_id: new FormControl('CarLocation_App'),
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });
  saveInServer() {
    
  }
}
