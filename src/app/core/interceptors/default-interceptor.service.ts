import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
// import { CoreService } from '../services/core.service';
// import { AuthService } from 'src/app/shared/services/auth.service';
// import { getCsrfToken } from '../helpers/token';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { IError403 } from '../types/errors';

@Injectable({
  providedIn: 'root'
})
export class DefaultInterceptorService implements HttpInterceptor {

  token = null;
  constructor(
    private snackBar: MatSnackBar
  ) {
    this.token = localStorage.getItem('access_token') || '';
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      withCredentials: true
    });
    if (this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
          console.log(err);
          let message = 'No eres tu somos nosotros, vuelve a intentarlo';
          if (err.status === 403) {
            message = (err.error.error as IError403).message
          }
          //const message = err?.error?.message;
          this.openSnackBar(message);
          throw err;
      }),
    );
  }

  openSnackBar(message: string, option: MatSnackBarConfig = {} ) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      ...option
    });
  }

  // generateHeader() {
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     'X-XSRF-TOKEN': getCsrfToken() || '',
  //   })
  // }
}
