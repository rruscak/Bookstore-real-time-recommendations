import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from './cart.service';
import { MatSnackBar, MatVerticalStepper } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild('stepper') stepper: MatVerticalStepper;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEmpty = true;

  constructor(private formBuilder: FormBuilder,
              private cartService: CartService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      check: [false, Validators.requiredTrue]
    });
    this.secondFormGroup = this.formBuilder.group({
      check: [false, Validators.requiredTrue]
    });
  }

  createOrder() {
    this.cartService.createOrder()
      .subscribe(res => {
        this.snackBar.open('Order created.', 'OK', {
          duration: 5000,
        });
        this.router.navigate(['/']);
      }, err => {
        this.router.navigate(['/']);
      });
  }

  onIsEmpty(event: boolean) {
    this.firstFormGroup.controls.check.setValue(!event);
    this.secondFormGroup.controls.check.setValue(!event);
    this.isEmpty = event;
  }
}
