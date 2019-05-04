import { Component, Input } from '@angular/core';
import { Book } from '../../book.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent {
  @Input() book: Book;

  constructor(private snackBar: MatSnackBar) {
  }

  addToCart() {
    this.snackBar.open('Book added to the shopping cart.', 'OK', {
      duration: 5000,
    });
  }
}
