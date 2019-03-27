import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LayoutModule } from '@angular/cdk/layout';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AppRoutingModule } from './app-routing.module';
import { UserCreateComponent } from './user/user-create.component';
import { PostFormComponent } from './posts/post-dialog/post-form.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/sign-up.component';
import { AuthInterceptor } from './auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    PostCreateComponent,
    PostListComponent,
    UserCreateComponent,
    PostFormComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // TODO: remove (example)
    FlexLayoutModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    // Mat Modules
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
