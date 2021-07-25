import { Component, OnInit } from '@angular/core';
import {OrderDetails} from '../model/order-details';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-user-order-view',
  templateUrl: './user-order-view.component.html',
  styleUrls: ['./user-order-view.component.css']
})
export class UserOrderViewComponent implements OnInit {

  orders: OrderDetails[];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getOrder().subscribe(response => {
      this.orders = response;
    }, error => console.log('Cant get orders'));
  }

}
