import { Component, OnInit } from '@angular/core';
import {CategoryForm} from '../forms/category-form';
import {HttpService} from '../http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryUpdate} from '../forms/category-update';

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

  formUpdate: CategoryUpdate = {
    newName: '',
    oldName: ''
  };

  constructor(private httpService: HttpService, private router: Router, private routeActivate: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryName = this.routeActivate.snapshot.paramMap.get('id');
    this.header = !this.categoryName ? 'Dodaj kategorię' : 'Edytuj kategorię';

    if (this.categoryName) {
      this.httpService.getCategory(this.categoryName).subscribe(data => {
        this.form.name = data.name;
      }, error => {
        this.header = 'Dodaj kategorię';
        this.categoryName = '';
        this.router.navigate(['/admin/category/add']);
      });
    }
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
    this.failureMessage = '';
    this.successMessage = '';
    this.formUpdate.oldName = this.categoryName;
    this.formUpdate.newName = this.form.name;
    this.httpService.putCategory(this.formUpdate).subscribe(data => {
        this.successMessage = 'Kategoria została edytowana';
        window.location.href = '/admin/category';
      },
      error => {
        this.failureMessage = 'Nie udało sie edytować autora';
      });
  }

}
