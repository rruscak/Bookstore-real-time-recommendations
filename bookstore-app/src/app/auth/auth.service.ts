import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { CartService } from '../shopping-cart/cart.service';

const BACKEND_URL = environment.apiUrl + 'user/';

@Injectable({providedIn: 'root'})
export class AuthService {
  private isAuth = false;
  private token: string;
  private tokenTimer: any;
  private userId: number;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private cartService: CartService) {
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuth;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(user: User) {
    this.http.post(BACKEND_URL + '/signup', user)
      .subscribe(res => {
        this.router.navigate(['/auth/login']);
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = {email, password};
    this.http.post<{ token: string, expiresIn: number, userId: number, totalInCart: number }>(
      BACKEND_URL + '/login',
      authData
    ).subscribe(res => {
      console.log(res);
      this.token = res.token;
      if (res.token) {
        const expiresInMs = res.expiresIn * 1000;
        this.setAuthTimer(expiresInMs);
        this.isAuth = true;
        this.userId = res.userId;
        this.authStatusListener.next(true);
        this.cartService.setTotalInCartListener(res.totalInCart);

        const expirationDate = new Date(new Date().getTime() + expiresInMs);
        this.saveAuthData(res.token, expirationDate, res.userId);
        this.router.navigate(['/']);
      }
    }, error => {
      this.authStatusListener.next(false);
    });
  }

  logout() {
    this.token = null;
    this.isAuth = false;
    this.userId = null;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.isAuth = true;
      this.setAuthTimer(expiresIn);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    console.log('Setting auth timer: ' + duration + 'ms.');
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = +localStorage.getItem('userId');
    if (!token || !expirationDate || !userId) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }

  private saveAuthData(token: string, expirationDate: Date, userId: number) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId.toString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }
}
