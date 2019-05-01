import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Book } from './book.model';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

const BACKEND_URL = environment.apiUrl + '/books/';

@Injectable({providedIn: 'root'})
export class BooksService {
  private books: Book[] = [];

  constructor(private http: HttpClient, private router: Router) {
  }

  getBook(id: number) {
    return this.http.get<Book>(BACKEND_URL + id);
  }
}
