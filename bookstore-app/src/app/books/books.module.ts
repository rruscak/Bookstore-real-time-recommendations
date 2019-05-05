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
import { ImageLoaderDirective } from '../shared/directives/image-loader.directive';

@NgModule({
  declarations: [
    BookListComponent,
    BookItemComponent,
    BookDetailComponent,
    BookFilterComponent,
    BookSorterComponent,
    ImageLoaderDirective
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FlexLayoutModule,
    RouterModule
  ]
})
export class BooksModule {
}
