import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../shopping-cart/cart.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit, OnDestroy {
  isAuth = false;
  totalInCart = 0;
  private authListenerSubs: Subscription;
  private totalInCartListenerSubs: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAuth = isAuthenticated;
      });

    this.totalInCart = this.cartService.getTotalItemsInCart();
    this.totalInCartListenerSubs = this.cartService
      .getTotalInCartListener()
      .subscribe(totalInCart => {
        this.totalInCart = totalInCart;
      });
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
    this.totalInCartListenerSubs.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
