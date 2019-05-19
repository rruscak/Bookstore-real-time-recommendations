import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { CartListComponent } from './list/cart-list.component';
import { CartItemComponent } from './list/item/cart-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CartComponent,
    CartListComponent,
    CartItemComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class CartModule {
}
