import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../model/product';
import {OrderRowRequest} from '../model/order-row-request';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {

  name: string;
  products: Product[];

  isUserLogged: boolean = !!localStorage.getItem('token');

  orderRow: OrderRowRequest = {
    orderRowId: null,
    productId: null,
    productQuantity: null
  };

  constructor(private httpService: HttpService, private router: Router, private routeActivate: ActivatedRoute) { }

  ngOnInit(): void {
    this.name = this.routeActivate.snapshot.paramMap.get('name');
    this.httpService.getProductsForCategory(this.name).subscribe(response => {
      console.log(response);
      this.products = response;
    }, error => console.log('Cant get products for category'));
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
