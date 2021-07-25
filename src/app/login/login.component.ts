import { Component, OnInit } from '@angular/core';
import {LoginForm} from '../forms/login';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: LoginForm = {
    email: '',
    password: ''
  };

  loginErrorMessage = '';

  constructor(private router: Router, private userService: UserService,
              private httpService: HttpService) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.httpService.postLoginForm(this.form).subscribe(
      token => {
        this.userService.saveTokenInLocalStorage(token.token);
        this.httpService.getUserDetails().subscribe(userDetails => {
          const role = userDetails.role;

          if (role.includes('ADMIN')) {
            this.router.navigate(['/admin']);
          } else {
            window.location.href = '/home';
          }
        });

      },
      err => {
        this.loginErrorMessage = HttpService.extractErrorMessage(err);
      });
  }

}
