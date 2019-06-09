import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { BookListComponent } from './books/book-list/book-list.component';
import { CartComponent } from './shopping-cart/cart.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'book/:bookId', component: BookDetailComponent},
  {path: 'books', component: BookListComponent},
  {path: 'cart', component: CartComponent},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'posts', loadChildren: './posts/posts.module#PostsModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
