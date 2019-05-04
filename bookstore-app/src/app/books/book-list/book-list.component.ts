import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { BooksService } from '../books.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  isLoading = false;
  books: Book[] = [];
  totalBooks = 0;
  pageSize = 2;
  currentPage = 1;
  // pageSizeOptions = [8, 16, 32, 64];
  pageSizeOptions = [2, 4, 6, 8];
  columnNum = 4;
  private booksSubs: Subscription;

  constructor(public booksService: BooksService, private media: MediaObserver) {
    media.media$
      .subscribe((change: MediaChange) => {
        // alert(change.mqAlias);
        console.log(change.mqAlias);
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
    this.isLoading = true;
    this.booksService.getPosts(this.pageSize, this.currentPage);
    this.booksSubs = this.booksService
      .getBooksUpdatedListener()
      .subscribe((bookData: { books: Book[], count: number }) => {
        this.isLoading = false;
        console.log(bookData.books);
        this.books = bookData.books;
        this.totalBooks = bookData.count;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.pageSize = pageData.pageSize;
    this.currentPage = ++pageData.pageIndex;
    this.booksService.getPosts(this.pageSize, this.currentPage);
  }


}
