import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import IUser from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  isSubmission = false;
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('');
  confirm_password = new FormControl('');
  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120),
  ]);
  phoneNumber = new FormControl('');

  showAlert: boolean = false;
  alertMsg: string = 'Please wait! Your account is being created.';
  alertColor: string = 'blue';

  constructor(private auth: AuthService) {}

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    password: this.password,
    confirm_password: this.confirm_password,
    age: this.age,
    phoneNumber: this.phoneNumber,
  });

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created.';
    this.alertColor = 'blue';
    this.isSubmission = true;

    const { email, password } = this.registerForm.value;
    try {
      this.auth.createUser(this.registerForm.value as IUser);
    } catch (ex) {
      console.error('register error', ex);
      this.alertMsg = 'An unexpected error occurred';
      this.alertColor = 'red';
      this.isSubmission = false;
      return;
    }

    this.alertMsg = 'Success! Your account has been created';
    this.alertColor = 'green';
    this.isSubmission = false;
  }
}
