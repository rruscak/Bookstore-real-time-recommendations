import { Component, Input } from '@angular/core';
import { Book } from '../../../shared/models/book.model';
import { CartService } from '../../../shopping-cart/cart.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent {
  @Input() book: Book;

  constructor(private cartService: CartService) {
  }

  addToCart() {
    this.cartService.addToCart(this.book.id);
  }
}
