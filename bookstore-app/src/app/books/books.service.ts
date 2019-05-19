import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Book } from '../shared/models/book.model';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Genre } from './genre.model';

const BACKEND_URL = environment.apiUrl + 'books/';
const BACKEND_URL_FILTERS = environment.apiUrl + 'filters/';

@Injectable({providedIn: 'root'})
export class BooksService {
  private booksUpdated = new Subject<{ books: Book[], count: number }>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getBooksUpdatedListener() {
    return this.booksUpdated.asObservable();
  }

  getBook(id: number) {
    return this.http.get<Book>(BACKEND_URL + id);
  }

  getBooks(limit: number, page: number,
           orderBy: string, orderDir: string,
           genreId: number, categoryId: number) {
    let queryParams = `?limit=${limit}&page=${page}`;
    // SORTING
    if (orderBy) {
      queryParams += `&orderBy=${orderBy}`;
    }
    if (orderDir) {
      queryParams += `&orderDir=${orderDir}`;
    }
    // FILTERING
    if (genreId) {
      queryParams += `&genreId=${genreId}`;
    }
    if (categoryId) {
      queryParams += `&categoryId=${categoryId}`;
    }
    this.http.get<{ books: Book[], count: number }>(BACKEND_URL + queryParams)
      .subscribe(res => {
        this.booksUpdated.next({
          books: res.books ? [...res.books] : [],
          count: res.count
        });
      });
  }

  getFilters() {
    return this.http.get<Genre[]>(BACKEND_URL_FILTERS);
  }
}
