import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Book } from './book.model';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + 'books/';

@Injectable({providedIn: 'root'})
export class BooksService {
  private books: Book[] = [];
  private booksUpdated = new Subject<{ books: Book[], count: number }>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getBooksUpdatedListener() {
    return this.booksUpdated.asObservable();
  }

  getBook(id: number) {
    return this.http.get<Book>(BACKEND_URL + id);
  }

  getPosts(limit: number, page: number) {
    const queryParams = `?limit=${limit}&page=${page}`;
    this.http.get<{ books: Book[], count: number }>(BACKEND_URL + queryParams)
      .subscribe((res) => {
        console.log(res);
        this.books = res.books;
        this.booksUpdated.next({
          books: [...this.books],
          count: res.count
        });
      });
  }
}
