import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Image } from '../../shared/image.model';


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

  columnNum = 4;

  constructor(media: MediaObserver) {
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
    const image: Image = {
      id: null,
      name: '',
      path: 'https://www.pantarhei.sk/media/catalog/product/cache/1/image/250x361/040ec09b1e35df139433887a97daa66f/m/e/metro-2035-91713.jpg'
    };

    const book = new Book(
      1,
      'Book Title',
      'Author Name',
      image,
      10.09);

    this.books.push(book);
    this.books.push(new Book(
      1,
      'This book title',
      'Author Name 2',
      image,
      10.00));
    this.books.push(new Book(
      1,
      'Book Title 3',
      'Author Name 3',
      image,
      10.00));
    this.books.push(book);
    this.books.push(book);
    this.books.push(book);
    this.books.push(book);
    this.books.push(new Book(
      1,
      'Book Title 4',
      'Author Name 4',
      image,
      10.00));
  }


}
