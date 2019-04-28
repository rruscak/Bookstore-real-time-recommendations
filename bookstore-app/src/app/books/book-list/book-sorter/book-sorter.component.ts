import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-sorter',
  templateUrl: './book-sorter.component.html',
  styleUrls: ['./book-sorter.component.css']
})
export class BookSorterComponent implements OnInit {
  bookOrder: string[] = ['Sales', 'Name', 'Price', 'Release date'];
  defaultOrder = this.bookOrder[0];

  constructor() {
  }

  ngOnInit() {
  }

}
