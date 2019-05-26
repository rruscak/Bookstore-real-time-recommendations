import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StarRatingModule } from 'angular-star-rating';
import { MatCarouselModule } from '@ngmodule/material-carousel';

@NgModule({
  declarations: [
    HomeComponent,
    CarouselItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    RouterModule,
    MatCarouselModule,
    StarRatingModule.forChild()
  ]
})
export class HomeModule {
}
