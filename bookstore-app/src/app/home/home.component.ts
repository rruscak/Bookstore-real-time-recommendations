import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books/books.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Book } from '../shared/models/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  slides = [
    'assets/images/books-banner-4.jpg',
    'assets/images/books-banner-1.jpg',
    'assets/images/books-banner-2.jpg',
    'assets/images/books-banner-3.jpg'
  ];

  isAuth = false;
  private authStatusSub: Subscription;

  constructor(public booksService: BooksService,
              private authService: AuthService) {
  }

  ngOnInit() {
    // Authentication
    this.isAuth = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAuth = isAuthenticated;
      });

    this.booksService.getRecommendedBooks(8, 1, 'name', 'ASC', null, null)
      .subscribe(res => {
        this.books = res.books;
        console.log(this.books);
      });
  }

}
