import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { routes } from './app.routes';
import { Notifier } from './shared/application/notifier';
import { errorInterceptor } from './shared/infrastructure/http/error.interceptor';
import { languageInterceptor } from './shared/infrastructure/http/language.interceptor';
import {
  BoundedContextTranslateLoader,
  provideTranslationContexts,
} from './shared/infrastructure/i18n/bounded-context-translate-loader';
import { SnackBarNotifier } from './shared/presentation/notifications/snack-bar-notifier';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([languageInterceptor, errorInterceptor])),
    { provide: Notifier, useClass: SnackBarNotifier },
    provideTranslationContexts(['shared']),
    provideTranslateService({
      loader: provideTranslateLoader(BoundedContextTranslateLoader),
      lang: 'en-US',
      fallbackLang: 'en-US',
    }),
  ],
};
