import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const languageInterceptor: HttpInterceptorFn = (request, next) => {
  const language = inject(TranslateService).getCurrentLang();
  if (!language) return next(request);
  return next(request.clone({ setHeaders: { 'Accept-Language': language } }));
};
