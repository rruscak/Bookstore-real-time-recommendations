import { NgModule } from '@angular/core';
import { BookListComponent } from './book-list/book-list.component';
import { AngularMaterialModule } from '../angular-material.module';
import { BookItemComponent } from './book-list/book-item/book-item.component';
import { CommonModule } from '@angular/common';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    BookListComponent,
    BookItemComponent,
    BookDetailComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FlexLayoutModule
  ]
})
export class BooksModule {
}
