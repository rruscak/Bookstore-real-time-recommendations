import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../../shared/models/book.model';
import { CartService } from '../../cart.service';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Output() quantityChanged = new EventEmitter<{ id: number, quantity: number }>();
  @Input() book: Book;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
  }

  incrementQuantity() {
    this.cartService.setQuantity(this.book.id, this.book.quantity + 1)
      .subscribe(res => {
        this.cartService.setTotalInCartListener(res.totalInCart);
        this.book.quantity = this.book.quantity + 1;
        this.emitQuantityChanged(this.book.quantity);
      });
  }

  decrementQuantity() {
    this.cartService.setQuantity(this.book.id, this.book.quantity - 1)
      .subscribe(res => {
        this.cartService.setTotalInCartListener(res.totalInCart);
        this.book.quantity = this.book.quantity - 1;
        this.emitQuantityChanged(this.book.quantity);
      });
  }

  removeFromCart() {
    this.cartService.setQuantity(this.book.id, 0)
      .subscribe(res => {
        this.cartService.setTotalInCartListener(res.totalInCart);
        this.emitQuantityChanged(0);
      });
  }

  private emitQuantityChanged(quantity: number) {
    this.quantityChanged.emit({id: this.book.id, quantity});
  }
}
