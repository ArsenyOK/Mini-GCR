import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const auth = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        toast.error('API is not available');
      }

      if (error.status === 401) {
        toast.error('Session expired');
        auth.logout();
        router.navigateByUrl('/login');
      }

      if (error.status >= 500) {
        toast.error('Server error occurred');
      }

      return throwError(() => error);
    }),
  );
};
