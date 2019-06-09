import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './shared/error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { BooksModule } from './books/books.module';
import { CartModule } from './shopping-cart/cart.module';
import { HomeModule } from './home/home.module';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { StarRatingConfigService, StarRatingModule } from 'angular-star-rating';
import { CustomStarRatingConfigService } from './shared/global/CustomStarRatingConfigService';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // TODO: remove (example)
    FlexLayoutModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    AngularMaterialModule,
    HomeModule,
    BooksModule,
    CartModule,
    StarRatingModule.forRoot()
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'de-DE' // 'de-DE' for Germany, 'fr-FR' for France ...
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }, {
    provide: StarRatingConfigService,
    useClass: CustomStarRatingConfigService
  }],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {
}
