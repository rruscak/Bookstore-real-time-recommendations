import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Book } from '../../shared/models/book.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  isLoading = false;
  books: Book[] = [];
  subtotal = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.cartService.getCartItems()
      .subscribe(books => {
        this.isLoading = false;
        this.books = books ? [...books] : [];
        this.setSubtotal();
        console.log(this.books);
      });
  }

  onQuantityChanged(event: { id: number, quantity: number }) {
    if (event.quantity === 0) {
      this.books = this.books.filter(b => b.id !== event.id);
    } else {
      this.books.find(b => b.id === event.id).quantity = event.quantity;
    }
    this.setSubtotal();
  }

  private setSubtotal() {
    this.subtotal = 0;
    this.books.forEach(b => this.subtotal += b.price * b.quantity);
  }
}
