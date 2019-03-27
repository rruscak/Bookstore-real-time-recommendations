import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth.component.css']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('emailField') emailField: ElementRef;
  hidePassword = true;
  isLoading = false;

  constructor(public authService: AuthService) {
  }

  ngAfterViewInit(): void {
    // this.emailField.nativeElement.focus();
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }
}
