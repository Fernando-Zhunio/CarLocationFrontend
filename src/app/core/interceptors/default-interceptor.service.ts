import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
// import { CoreService } from '../services/core.service';
// import { AuthService } from 'src/app/shared/services/auth.service';
// import { getCsrfToken } from '../helpers/token';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DefaultInterceptorService implements HttpInterceptor {

  token = null;
  constructor() {
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
        if (err.status === 401) {
          
          const message = err?.error?.message;
          if (message) {
            this.openSnackBar(message);
          }
          throw err;
        }
        if (err.status === 422) {
          const message = err?.error?.message;
          if (message) {
            this.openSnackBar(message);
          }
          throw err;
        }
        if (err.status === 500) {
          const message = 'No eres tu somos nosotros, vuelve a intentarlo';
          if (message) {
            this.openSnackBar(message);
          }
          throw err;
        }
        // return throwError(() => err);
        throw err;

      }),
    );
  }

  openSnackBar(message: string, option: MatSnackBarConfig = {} ) {
    // this.snackBar.open(message, 'Cerrar', {
    //   duration: 4000,
    //   horizontalPosition: 'end',
    //   verticalPosition: 'top',
    //   ...option
    // });
  }

  // generateHeader() {
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     'X-XSRF-TOKEN': getCsrfToken() || '',
  //   })
  // }
}
