import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {HttpService} from '../http.service';
import {Router} from '@angular/router';
import {Address} from '../forms/address';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {

  constructor(private httpService: HttpService, private router: Router, private userService: UserService) { }

  failureMessage = '';
  successMessage = '';

  form: Address = {
    city: '',
    zipCode: '',
    street: '',
    buildingNumber: '',
    user_email: null,
    status: 'ACTIVE'
  };

  ngOnInit(): void {
    this.userService.getUserDetail().subscribe(data => {
      data.addresses.map(userAddress => {
        this.form.city = userAddress.city;
        this.form.zipCode = userAddress.zipCode;
        this.form.buildingNumber = userAddress.buildingNumber;
        this.form.street = userAddress.street;
      });
      this.form.user_email = data.email;
    });
  }

  addAddress(): void {
    this.httpService.saveAddress(this.form).subscribe(response => {
      this.successMessage = 'Udało się dodać adres';
      console.log('Udało się dodać adres');
    }, error => {
      this.failureMessage = 'Nie udało się dodać adresu';
      console.log('Nie udało sie dodać adresu');
    });
  }

}
