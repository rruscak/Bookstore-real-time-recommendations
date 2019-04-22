import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShoppingCartComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class ShoppingCartModule {
}
