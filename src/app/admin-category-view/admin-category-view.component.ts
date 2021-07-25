import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {Router} from '@angular/router';
import {CategoryDetails} from '../model/category';

@Component({
  selector: 'app-admin-category-view',
  templateUrl: './admin-category-view.component.html',
  styleUrls: ['./admin-category-view.component.css']
})
export class AdminCategoryViewComponent implements OnInit {

  constructor(private httpService: HttpService, private router: Router) { }

  categories: CategoryDetails[];

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.httpService.getCategories().subscribe(response => {
      console.log(response);
      this.categories = response;
    }, error => console.log('Nie można pobrać listy kategori'));
  }

  editCategory(categoryName: string): void {
    this.router.navigate(['/admin/category/add', { id: categoryName} ]);
  }

  removeCategory(categoryName: string): void {
    this.httpService.removeCategory(categoryName).subscribe(response => {
      console.log('usunieto kategorie');
      window.location.reload();
    }, error => console.log('nie mozna usunac kategori'));
  }

  redirectToAddCategory(): void {
    this.router.navigate(['/admin/category/add']);
  }

}
