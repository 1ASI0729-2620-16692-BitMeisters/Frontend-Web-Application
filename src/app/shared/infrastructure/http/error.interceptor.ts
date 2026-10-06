import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Notifier } from '../../application/notifier';
import { ApiError } from './api-error';

function globalMessageKey(error: ApiError): string | null {
  if (error.isNetworkError) return 'errors.network';
  if (error.isUnauthorized) return 'errors.unauthorized';
  if (error.isForbidden) return 'errors.forbidden';
  if (error.isServerError) return 'errors.server';
  return null;
}

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const notifier = inject(Notifier);

  return next(request).pipe(
    catchError((response: HttpErrorResponse) => {
      const error = ApiError.from(response);
      const messageKey = globalMessageKey(error);
      if (messageKey) notifier.error(messageKey);
      return throwError(() => error);
    }),
  );
};
