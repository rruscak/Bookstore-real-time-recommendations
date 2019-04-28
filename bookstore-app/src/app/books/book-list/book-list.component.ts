import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { MediaChange, MediaObserver } from '@angular/flex-layout';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  pageSize = 16;
  currentPage = 1;
  pageSizeOptions = [8, 16, 32, 64];

  columnNum = 0;

  constructor(media: MediaObserver) {
    media.media$
      .subscribe((change: MediaChange) => {
        // alert(change.mqAlias);
        console.log(change.mqAlias);
        if (change.mqAlias === 'xs') {
          this.columnNum = 2;
        } else if (change.mqAlias === 'sm') {
          this.columnNum = 3;
        } else if (change.mqAlias === 'md') {
          this.columnNum = 3;
        } else if (change.mqAlias === 'lg') {
          this.columnNum = 4;
        }
      });
  }

  ngOnInit(): void {
    const book = new Book(
      1,
      'Book Title',
      'Author Name',
      'https://www.pantarhei.sk/media/catalog/product/cache/1/image/250x361/040ec09b1e35df139433887a97daa66f/m/e/metro-2035-91713.jpg',
      10.09);

    this.books.push(book);
    this.books.push(new Book(
      1,
      'This book title',
      'Author Name 2',
      'https://www.pantarhei.sk/media/catalog/product/cache/1/image/250x361/040ec09b1e35df139433887a97daa66f/m/e/metro-2033-86428.jpg',
      10.00));
    this.books.push(new Book(
      1,
      'Book Title 3',
      'Author Name 3',
      'https://www.pantarhei.sk/media/catalog/product/cache/1/image/250x361/' +
      '040ec09b1e35df139433887a97daa66f/m/e/metro-a-trilogia-24882.jpg',
      10.00));
    this.books.push(book);
    this.books.push(book);
    this.books.push(book);
    this.books.push(book);
    this.books.push(new Book(
      1,
      'Book Title 4',
      'Author Name 4',
      'https://www.pantarhei.sk/media/catalog/product/cache/1/image/250x361/040ec09b1e35df139433887a97daa66f/m/e/metro-2035-91713.jpg',
      10.00));
  }


}
