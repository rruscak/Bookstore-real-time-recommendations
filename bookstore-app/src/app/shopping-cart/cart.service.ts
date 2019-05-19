import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Book } from '../shared/models/book.model';

const BACKEND_URL = environment.apiUrl + 'cart/';

@Injectable({providedIn: 'root'})
export class CartService {
  private totalInCart = 0;
  private totalInCartListener = new Subject<number>();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  getTotalItemsInCart() {
    return this.totalInCart;
  }

  getTotalInCartListener() {
    return this.totalInCartListener.asObservable();
  }

  setTotalInCartListener(totalInCart: number) {
    this.totalInCartListener.next(totalInCart);
  }

  addToCart(bookId: number) {
    // this.addToLocalStorageCart(bookId, 1);
    this.http.put<{ totalInCart: number }>(BACKEND_URL + bookId, null)
      .subscribe(res => {
        this.totalInCartListener.next(res.totalInCart);
        this.snackBar.open('Book added to the shopping cart.', 'OK', {
          duration: 5000,
        });
      });
  }

  getCartItems() {
    return this.http.get<Book[]>(BACKEND_URL);
  }

  setQuantity(bookId: number, quantity: number) {
    return this.http.put<{ totalInCart: number }>(BACKEND_URL, {bookId, quantity});
  }

  removeFromCart(id: number) {
    return this.http.delete(BACKEND_URL + id);
  }


  // private addToLocalStorageCart(id, quantity) {
  //   const item = {id, quantity};
  //   let items = [];
  //   const itemsInLSCart = localStorage.getItem('itemsInCart');
  //   if (itemsInLSCart) {
  //     items = JSON.parse(itemsInLSCart);
  //   }
  //   console.log(items);
  //   items.push(item);
  //
  //   localStorage.setItem('itemsInCart', JSON.stringify(items));
  //   localStorage.setItem('totalInCart', quantity);
  // }
}
