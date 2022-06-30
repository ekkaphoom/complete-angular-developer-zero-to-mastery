import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: '',
  };
  alertMsg: string = '';
  bgColor: string = 'blue';
  isSubmission = false;
  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {}

  async login() {
    console.log(this.credentials);
    try {
      this.isSubmission = true;
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
      this.bgColor = 'green';
      this.alertMsg = 'Login succeed!';
    } catch (ex) {
      this.bgColor = 'red';
      this.alertMsg = 'Login failed!';
    } finally {
      this.isSubmission = false;
    }
  }
}
