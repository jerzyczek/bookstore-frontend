import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {HttpService} from '../http.service';
import {CategoryDetails} from '../model/category';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {

  isUserLogged: boolean = !!localStorage.getItem('token');
  isAdmin = false;
  categories: CategoryDetails[];

  constructor(private router: Router, private userService: UserService, private httpService: HttpService) { }

  ngOnInit(): void {
    this.checkIsAdmin();
    this.getCategories();
  }

  addresspage(): void {
    this.router.navigate(['/address']);
  }

  orderspage(): void {
    this.router.navigate(['/orders']);
  }

  loginpage(): void {
    this.router.navigate(['/login']);
  }

  signuppage(): void {
    this.router.navigate(['/signup']);
  }

  admin(): void {
    this.router.navigate(['/admin']);
  }

  logout(): void {
    this.userService.logout();
    window.location.reload();
  }

  checkIsAdmin(): void {
    if (localStorage.getItem('token')) {
      this.userService.getUserDetail().toPromise().then(value => {
        if (value.role.includes('ADMIN')) {
          this.isAdmin = true;
        }
      });
    }
  }

  getCategories(): void {
    this.httpService.getCategoriesForNav().subscribe(response => {
      console.log(response);
      this.categories = response;
    }, error => console.log('Cant get categories for nav'));
  }

  showCategory(name: string): void {
    console.log('aaaa');
  }

}
