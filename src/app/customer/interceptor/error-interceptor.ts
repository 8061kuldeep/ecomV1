import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../components/error/error.component';
@Injectable()
export class errorInterceptor implements HttpInterceptor {
  errorMsg: String =
    'unknown error! or Please check your backend server is running. ';
  constructor(private dialog: MatDialog) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error.message) {
          this.errorMsg = error.error.message;
        }
        this.dialog.open(ErrorComponent, { data: { message: this.errorMsg } });
        return throwError(error);
      })
    );
  }
}
