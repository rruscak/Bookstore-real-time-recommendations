import { NgModule } from '@angular/core';
import { BookListComponent } from './book-list/book-list.component';
import { AngularMaterialModule } from '../angular-material.module';
import { BookItemComponent } from './book-list/book-item/book-item.component';
import { CommonModule } from '@angular/common';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BookFilterComponent } from './book-list/book-filter/book-filter.component';
import { RouterModule } from '@angular/router';
import { BookSorterComponent } from './book-list/book-sorter/book-sorter.component';
import { StarRatingModule } from 'angular-star-rating';
import { CarouselModule } from '../carousel/carousel.module';

@NgModule({
  declarations: [
    BookListComponent,
    BookItemComponent,
    BookDetailComponent,
    BookFilterComponent,
    BookSorterComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    CarouselModule,
    StarRatingModule.forChild()
  ]
})
export class BooksModule {
}
