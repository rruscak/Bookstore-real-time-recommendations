import { Component, Input } from '@angular/core';
import { Book } from '../../../shared/models/book.model';
import { CartService } from '../../../shopping-cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent {
  @Input() book: Book;
  @Input() isAuth: boolean;

  constructor(private cartService: CartService,
              private router: Router) {
  }

  addToCart() {
    if (!this.isAuth) {
      this.router.navigate(['/auth/login']);
      return;
    }
    this.cartService.addToCart(this.book.id);
  }
}
