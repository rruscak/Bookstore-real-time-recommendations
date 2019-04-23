import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Book } from './book.model';

export class BooksService {
  private books: Book[] = [];

  constructor(private http: HttpClient, private router: Router) {
  }
}
