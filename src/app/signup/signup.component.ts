import { Component, OnInit } from '@angular/core';
import {SignUp} from '../forms/sign-up';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  failureMessage = '';
  successMessage = '';

  form: SignUp = {
    email: '',
    password: '',
    repeatedPassword: '',
  };

  constructor(private httpService: HttpService) { }

    ngOnInit(): void {
  }

  signup(): void {
    this.failureMessage = '';
    this.successMessage = '';
    this.httpService.postSignUpForm(this.form).subscribe(data => {
        this.successMessage = 'Konto zostalo utworzone, teraz mozesz sie zalogowac';
      },
      error => {
        this.failureMessage = 'Nie można załozyć konta. Konto istnieje';
      });
  }

}
