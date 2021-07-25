import { Component, OnInit } from '@angular/core';
import {Product} from '../model/product';
import {OrderRowRequest} from '../model/order-row-request';
import {HttpService} from '../http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  products: Product[];

  isUserLogged: boolean = !!localStorage.getItem('token');

  orderRow: OrderRowRequest = {
    orderRowId: null,
    productId: null,
    productQuantity: null
  };

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.httpService.getProductsMainPage().subscribe(response => {
      console.log(response);
      this.products = response;
    }, error => console.log('Cant get products'));
  }

  addToCart(productId: any): void {
    this.orderRow.productId = null;
    this.orderRow.productQuantity = null;

    this.orderRow.productId = productId;
    this.orderRow.productQuantity = 1;

    this.httpService.addToCart(this.orderRow).subscribe(response => {
      console.log('Product added to cart');
      window.location.href = '/cart';
    }, error => console.log('Cant add product to cart'));
  }

}
