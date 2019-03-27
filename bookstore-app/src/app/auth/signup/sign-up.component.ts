import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../auth.component.css']
})
export class SignUpComponent implements AfterViewInit {
  @ViewChild('emailField') emailField: ElementRef;
  hidePassword = true;
  isLoading = false;

  constructor(public authService: AuthService) {
  }

  ngAfterViewInit(): void {
    // this.emailField.nativeElement.focus();
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
