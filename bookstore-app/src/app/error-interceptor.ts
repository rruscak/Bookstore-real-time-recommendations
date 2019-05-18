import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from './shared/error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);
        let errMessage = 'An unknown error occurred!';
        if (error.error.message) {
          errMessage = error.error.message;
        }
        this.dialog.open(ErrorComponent, {
          data: {
            status: error.status,
            message: errMessage
          }
        });
        return throwError(error);
      })
    );
  }

}
