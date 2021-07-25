import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {UserDetails} from './model/user-details';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userDetailsCache: Observable<UserDetails> = new Observable<UserDetails>();

  private userLogged: Subject<boolean> = new Subject();

  constructor(private httpService: HttpService, private router: Router) {
    this.userLogged.next(false);
  }

  getUserDetail(): Observable<UserDetails> {
    if (localStorage.getItem('token')) {
      this.userDetailsCache = this.httpService
        .getUserDetails()
        .pipe(shareReplay(1));

      return this.userDetailsCache;
    }

    console.log('user not logged');
  }

  saveTokenInLocalStorage(token: string): void {
    localStorage.setItem('token', token);
    this.userLogged.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userLogged.next(false);
    this.router.navigateByUrl('/');
    console.log('emittend logout event');
  }

}
