import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../shared/models/book.model';
import { BooksService } from '../books.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CartService } from '../../shopping-cart/cart.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { RatingChangeEvent } from 'angular-star-rating';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit, OnDestroy {
  isLoading = false;
  isLoadingRec = true;
  private bookId: string;
  book: Book;
  relatedBooks: Book[];

  isAuth = false;
  private authStatusSub: Subscription;

  constructor(private route: ActivatedRoute,
              private booksService: BooksService,
              private cartService: CartService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    // Authentication
    this.isAuth = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAuth = isAuthenticated;
      });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('bookId')) {
        this.bookId = paramMap.get('bookId');
        console.log(this.bookId);
        this.isLoading = true;
        this.booksService
          .getBook(Number(this.bookId))
          .subscribe((res) => {
            this.isLoading = false;
            if (res) {
              console.log(res);
              this.book = res;
            } else {
              this.router.navigate(['/']);
            }
          });
      } else {
        this.router.navigate(['/']);
      }
    });

    // Related Books
    this.booksService.getRelatedBooks(this.bookId, 10)
      .subscribe(res => {
        this.relatedBooks = res;
        console.log(this.relatedBooks);
      });
  }

  addToCart() {
    if (!this.isAuth) {
      this.router.navigate(['/auth/login']);
      return;
    }
    this.cartService.addToCart(this.book.id);
  }

  onRatingClickChange($event: RatingChangeEvent) {
    console.log('rated: ' + $event.rating);
    this.booksService.rateBook(this.book.id, $event.rating)
      .subscribe(result => {
        if (result.rating) {
          console.log('result: ' + result.rating);
          this.book.rating = result.rating;
        }
      });
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
