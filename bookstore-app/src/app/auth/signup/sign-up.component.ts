import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../auth.component.css']
})
export class SignUpComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('emailField') emailField: ElementRef;
  hidePassword = true;
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  ngAfterViewInit(): void {
    // this.emailField.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const user: User = {
      email: form.value.email,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      password: form.value.password,
    };
    this.authService.createUser(user);
  }
}
