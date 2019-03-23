import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../auth.component.css']
})
export class SignUpComponent implements AfterViewInit {
  @ViewChild('emailField') emailField: ElementRef;
  hidePassword = true;
  isLoading = false;

  ngAfterViewInit(): void {
    // this.emailField.nativeElement.focus();
  }

  onSignUp(form: NgForm) {
    console.log(form.value.email);
    console.log(form.value.password);
  }
}
