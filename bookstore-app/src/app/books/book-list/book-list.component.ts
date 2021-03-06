import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../shared/models/book.model';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { BooksService } from '../books.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {
  isLoading = false;
  books: Book[] = [];
  totalBooks = 0;
  pageSize = 8;
  currentPage = 1;
  pageSizeOptions = [4, 8, 16, 32];
  columnNum = 4;

  genreId: number = null;
  categoryId: number = null;
  orderBy = 'name';
  orderDir = 'ASC';

  isAuth = false;
  private authStatusSub: Subscription;
  private booksSubs: Subscription;

  constructor(public booksService: BooksService,
              private authService: AuthService,
              private media: MediaObserver) {
    media.media$
      .subscribe((change: MediaChange) => {
        switch (change.mqAlias) {
          case 'xs':
            this.columnNum = 2;
            break;
          case 'md':
            this.columnNum = 3;
            break;
          case 'lg':
            this.columnNum = 4;
            break;
        }
      });
  }

  ngOnInit(): void {
    // Authentication
    this.isAuth = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAuth = isAuthenticated;
      });

    this.isLoading = true;
    this.fetchBooks();
    this.booksSubs = this.booksService
      .getBooksUpdatedListener()
      .subscribe((bookData: { books: Book[], count: number }) => {
        this.isLoading = false;
        this.books = bookData.books;
        this.totalBooks = bookData.count;
      });
  }

  private fetchBooks() {
    this.isLoading = true;
    this.booksService.getBooks(
      this.pageSize,
      this.currentPage,
      this.orderBy,
      this.orderDir,
      this.genreId,
      this.categoryId
    );
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.pageSize = pageData.pageSize;
    this.currentPage = ++pageData.pageIndex;
    this.fetchBooks();
  }

  onSortingChanged(eventData: { orderBy: string, orderDir: string }) {
    if (this.orderBy === eventData.orderBy && this.orderDir === eventData.orderDir) {
      return;
    }
    this.isLoading = true;
    this.orderBy = eventData.orderBy;
    this.orderDir = eventData.orderDir;
    this.fetchBooks();
  }

  onFilteringChanged(eventDate: { genreId: number; categoryId: number }) {
    if (this.genreId === eventDate.genreId && this.categoryId === eventDate.categoryId) {
      return;
    }
    this.genreId = eventDate.genreId;
    this.categoryId = eventDate.categoryId;
    this.fetchBooks();
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
