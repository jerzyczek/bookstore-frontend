import { Component, OnInit } from '@angular/core';
import {CategoryForm} from '../forms/category-form';
import {HttpService} from '../http.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-admin-category-add',
  templateUrl: './admin-category-add.component.html',
  styleUrls: ['./admin-category-add.component.css']
})
export class AdminCategoryAddComponent implements OnInit {

  header: string;
  categoryName: string;

  failureMessage = '';
  successMessage = '';

  form: CategoryForm = {
    name: ''
  };

  constructor(private httpService: HttpService, private router: Router, private routeActivate: ActivatedRoute) { }

  ngOnInit(): void {
  }

  save(): void {
    this.httpService.saveCategory(this.form).subscribe(response => {
      this.successMessage = 'Udało się dodać kategorie';
      window.location.href = '/admin/category';
    }, error => {
      this.failureMessage = 'Nie udało się dodać kategori';
    });
  }

  edit(): void {

  }

}
