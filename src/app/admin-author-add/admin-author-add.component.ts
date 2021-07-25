import { Component, OnInit } from '@angular/core';
import {AuthorForm} from '../forms/author-form';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-admin-author-add',
  templateUrl: './admin-author-add.component.html',
  styleUrls: ['./admin-author-add.component.css']
})
export class AdminAuthorAddComponent implements OnInit {

  header: string;
  authorId: number;

  failureMessage = '';
  successMessage = '';

  form: AuthorForm = {
    id: null,
    firstname: '',
    lastname: ''
  };

  constructor(private httpService: HttpService, private router: Router, private routeActivate: ActivatedRoute) { }

  ngOnInit(): void {
    this.authorId = +this.routeActivate.snapshot.paramMap.get('id');
    this.header = !this.authorId ? 'Dodaj autora' : 'Edytuj autora';

    if (this.authorId) {
      this.httpService.getAuthor(this.authorId).subscribe(data => {
        this.form.firstname = data.firstname;
        this.form.lastname = data.lastName;
      }, error => {
        this.header = 'Dodaj składnik';
        this.authorId = null;
        this.router.navigate(['/admin/ingredients/add']);
      });
    }
  }

  save(): void {
    this.failureMessage = '';
    this.successMessage = '';
    this.httpService.postAuthor(this.form).subscribe(data => {
        this.successMessage = 'Autor został dodany';
        this.router.navigate(['/admin/authors']);
      },
      error => {
        this.failureMessage = 'Nie udało sie dodać autora';
      });
  }

  edit(): void {
    this.failureMessage = '';
    this.successMessage = '';
    this.form.id = this.authorId;
    this.httpService.putAuthor(this.form).subscribe(data => {
        this.successMessage = 'Autor został edytowany';
        this.router.navigate(['/admin/authors']);
      },
      error => {
        this.failureMessage = 'Nie udało sie edytować autora';
      });
  }

}
