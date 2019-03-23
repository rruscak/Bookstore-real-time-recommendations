import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth.component.css']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('emailField') emailField: ElementRef;
  hidePassword = true;
  isLoading = false;

  ngAfterViewInit(): void {
    // this.emailField.nativeElement.focus();
  }

  onLogin(form: NgForm) {
    console.log(form.value.email);
    console.log(form.value.password);
  }
}
