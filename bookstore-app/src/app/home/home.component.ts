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
  recommendedBooks: Book[] = [];
  recentBooks: Book[] = [];
  slides = [
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

    // Recommended Books
    this.booksService.getRecentBooks(5)
      .subscribe(res => {
        this.recommendedBooks = res;
        console.log(this.recommendedBooks);
      });
    // Recent Books
    if (this.isAuth) {
      console.log('A');
      // Recent Books
      this.booksService.getRecentBooks(5)
        .subscribe(res => {
          this.recentBooks = res;
          console.log(this.recentBooks);
        });
    }
  }

}
