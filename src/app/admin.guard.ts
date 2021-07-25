import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from './user.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (localStorage.getItem('token')) {
      return this.userService.getUserDetail()
        .pipe(map(
          userDetails => {
            console.log('user role: ' + userDetails.role);
            return userDetails.role.includes('ADMIN') ? true : this.router.parseUrl('/');
          }));
    }
  }

}
