import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);

  const skip = req.url.includes('/users');
  if (skip) return next(req);

  loading.show();

  return next(req).pipe(finalize(() => loading.hide()));
};
