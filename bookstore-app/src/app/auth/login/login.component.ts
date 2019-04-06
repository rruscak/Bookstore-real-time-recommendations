import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth.component.css']
})
export class LoginComponent implements AfterViewInit, OnInit, OnDestroy {
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

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }
}
