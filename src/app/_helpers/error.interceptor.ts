import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackbarService } from '../_services/snackbar.service';
import { ErrorUtils } from '../../utils/error.utils';
import { AuthService } from '../_services/auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthService,
    private snackbarService: SnackbarService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {

          // If unauthorized (code 401) logout
          if (err.status === 401) {
              this.snackbarService.openDefaultSnackBar(ErrorUtils.getMessage(ErrorUtils.HTTP_UNAUTHORIZED));
              this.authenticationService.logout();
          }

          const error = err.error.message || err.statusText;
          return throwError(error);
      }));
  }

}
