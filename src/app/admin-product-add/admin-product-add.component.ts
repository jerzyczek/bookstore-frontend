import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryDetails} from '../model/category';
import {AuthorDetails} from '../model/author';
import {ProductForm} from '../forms/product-form';

@Component({
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html',
  styleUrls: ['./admin-product-add.component.css']
})
export class AdminProductAddComponent implements OnInit {

  header: string;
  productId: number;

  form: ProductForm = {
    id: null,
    name: '',
    description: '',
    price: null,
    quantity: 1,
    imgURL: '',
    category: {
      name: ''
    },
    author: {
      id: null,
      firstname: '',
      lastName: '',
    }
  };

  failureMessage = '';
  successMessage = '';

  categories: CategoryDetails[];
  authors: AuthorDetails[];

  constructor(private httpService: HttpService, private router: Router, private routeActivate: ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = +this.routeActivate.snapshot.paramMap.get('id');
    this.header = !this.productId ? 'Dodaj produkt' : 'Edytuj produkt';

    if (this.productId) {
      this.httpService.getProduct(this.productId).subscribe(data => {
        console.log(data);
        this.form.name = data.name;
        this.form.description = data.description;
        this.form.description = data.description;
        this.form.price = data.price;
        this.form.quantity = data.quantity;
        this.form.imgURL = data.imgURL;
        this.form.category = data.category;
        this.form.author = data.author;
      }, error => {
        this.header = 'Dodaj składnik';
        this.productId = null;
        this.router.navigate(['/admin/ingredients/add']);
      });
    }
    this.getCategories();
    this.getAuthors();
  }

  getCategories() {
    this.httpService.getCategories().subscribe(response => {
      this.categories = response;
      console.log(response)
    }, error => console.log('Cant get categories'));
  }

  getAuthors() {
    this.httpService.getAuthors().subscribe(response => {
      this.authors = response;
    }, error => console.log('Nie można pobrać autorów'));
  }

  saveProduct() {
    this.failureMessage = '';
    this.successMessage = '';

    this.httpService.saveProduct(this.form).subscribe(data => {
        this.successMessage = 'Produkt został dodany';
        this.router.navigate(['/admin/product']);
      },
      error => {
        this.failureMessage = 'Nie udało sie dodać produktu';
      });
  }

  edit(productId: any): void {

  }


}
