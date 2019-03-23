import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostFormComponent } from './posts/post-dialog/post-form.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/sign-up.component';

const routes: Routes = [
  {path: '', component: PostListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'create', component: PostCreateComponent},
  {path: 'form', component: PostFormComponent},
  {path: 'edit/:postId', component: PostFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
