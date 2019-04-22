import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostFormComponent } from './posts/post-dialog/post-form.component';
import { AuthGuard } from './auth/auth.guard';
import { BookListComponent } from './books/book-list/book-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {path: '', component: BookListComponent},
  {path: 'books', component: BookListComponent},
  {path: 'cart', component: ShoppingCartComponent},
  {path: 'posts', component: PostListComponent},
  {path: 'create', component: PostCreateComponent, canActivate: [AuthGuard]},
  {path: 'form', component: PostFormComponent, canActivate: [AuthGuard]},
  {path: 'edit/:postId', component: PostFormComponent, canActivate: [AuthGuard]},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
