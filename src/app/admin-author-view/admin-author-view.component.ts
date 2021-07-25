import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {Router} from '@angular/router';
import {AuthorDetails} from '../model/author';

@Component({
  selector: 'app-admin-author-view',
  templateUrl: './admin-author-view.component.html',
  styleUrls: ['./admin-author-view.component.css']
})
export class AdminAuthorViewComponent implements OnInit {

  authors: AuthorDetails[];

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors(): void {
    this.httpService.getAuthors().subscribe(response => {
      console.log(response);
      this.authors = response;
    }, error => console.log('Nie można pobrać listy autorów'));
  }

  editAuthor(authorId: number): void {
    this.router.navigate(['/admin/authors/add', { id: authorId} ]);
  }

  removeAuthor(authorId: number): void {
    this.httpService.removeAuthor(authorId).subscribe(response => {
      console.log('usunieto autora');
      window.location.reload();
    }, error => console.log('nie mozna usunac autora'));
  }

  redirectToAddAuthor(): void {
    this.router.navigate(['/admin/authors/add']);
  }

}
