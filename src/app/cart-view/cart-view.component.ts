import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {Router} from '@angular/router';
import {OrderRowRequest} from '../model/order-row-request';
import {CartDetails} from '../model/cart-details';
import {OrderRow} from '../model/order-row';
import {ShippingMethod} from '../model/shipping-method';
import {Order} from '../model/order';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  isUserLogged: boolean = !!localStorage.getItem('token');

  isCartEmpty = false;

  cartItems: CartDetails;

  orderRows: OrderRow[];

  shippingMethod: ShippingMethod[];

  selectedShippingMethod: ShippingMethod = {
    price: null,
    name: null
  };

  orderRowRequest: OrderRowRequest[] = [];

  orderRowRequestSingle: OrderRowRequest = {
    productId: null,
    orderRowId: null,
    productQuantity: null,
  };

  order: Order = {
    shippingMethod: 'Dhl',
    orderRowRequest: []
  };

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    if (this.isUserLogged) {
      this.httpService.getCart().subscribe(response => {
        console.log(response);
        this.cartItems = response;
        this.orderRows = this.cartItems.orderRowDtos;
        if (this.orderRows.length >= 1) {
          this.isCartEmpty = true;
        }
      }, error => console.log('Error'));
      this.getShippingMethod();
    }
  }

  priceSum(): number {
    let sumObj = 0;
    if (this.cartItems) {
      this.cartItems.orderRowDtos.forEach(object => {
        sumObj += object.productDto.price;
      });
    }

    return sumObj;
  }

  removeOrderRow(orderRowId): void {
    this.httpService.removeOrderRow(orderRowId).subscribe(response => {
      console.log('OrderRow remover');
      window.location.reload();
    }, error => console.log('Error while removing order row'));
  }

  getShippingMethod() {
    this.httpService.getShippingMethod().subscribe(response => {
      this.shippingMethod = response;
    }, error => console.log('Error while getting shipping methods'));
  }

  handleChange(method: ShippingMethod): void {
    // this.shippingMethod = event.target.value;
    // console.log(this.shippingMethod);
    this.selectedShippingMethod.price = method.price;
    this.selectedShippingMethod.name = method.name;
  }

  saveOrder(orderRows: OrderRow[]): void {
    this.orderRowRequestSingle.productId = null;
    this.orderRowRequestSingle.productQuantity = null;
    this.orderRowRequestSingle.orderRowId = null;

    this.cartItems.orderRowDtos.map(item => {
      this.orderRowRequestSingle.productQuantity = 1;
      this.orderRowRequestSingle.productId = item.productDto.id;
      this.orderRowRequestSingle.orderRowId = item.orderRowId;

      this.orderRowRequest.push({
        productQuantity: this.orderRowRequestSingle.productQuantity,
        productId: this.orderRowRequestSingle.productId,
        orderRowId: this.orderRowRequestSingle.orderRowId
      });

      this.orderRowRequestSingle.productId = null;
      this.orderRowRequestSingle.productQuantity = null;
      this.orderRowRequestSingle.orderRowId = null;
    });

    if (this.selectedShippingMethod.name) {
      this.order.shippingMethod = this.selectedShippingMethod.name;
    }

    this.order.orderRowRequest = this.orderRowRequest;

    console.log(this.order);
    console.log(this.cartItems);
    this.httpService.saveOrder(this.order).subscribe(response => {
      window.location.reload();
    }, error => console.log('Cant save order'));
  }

}

