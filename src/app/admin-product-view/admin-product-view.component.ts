import { Component, OnInit } from '@angular/core';
import {Product} from '../model/product';
import {HttpService} from '../http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-product-view',
  templateUrl: './admin-product-view.component.html',
  styleUrls: ['./admin-product-view.component.css']
})
export class AdminProductViewComponent implements OnInit {

  constructor(private httpService: HttpService, private router: Router) { }

  products: Product[];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.httpService.getProductsAdmin().subscribe(response => {
      this.products = response;
      console.log(response);
    }, error => console.log('Cant get products for admin'));
  }

  editProduct(productId: any): void {
    this.router.navigate(['/admin/product/add', { id: productId} ]);
  }

  removeProduct(productId: any): void {
    this.httpService.removeProduct(productId).subscribe(response => {
      console.log('usunieto product');
      window.location.reload();
    }, error => console.log('nie mozna usunac produktu'));
  }

  redirectToAddProduct(): void {
    this.router.navigate(['/admin/product/add']);
  }

}
