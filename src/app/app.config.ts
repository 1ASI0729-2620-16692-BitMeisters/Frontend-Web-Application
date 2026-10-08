import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { Notifier } from './shared/application/notifier';
import { languageInterceptor } from './shared/infrastructure/http/language.interceptor';
import { provideMaterialDefaults } from './shared/presentation/material/material-defaults';
import { SnackBarNotifier } from './shared/presentation/notifications/snack-bar-notifier';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([languageInterceptor])),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './i18n/',
        suffix: '.json',
        useHttpBackend: true,
      }),
      lang: 'en-US',
      fallbackLang: 'en-US',
    }),
    { provide: Notifier, useClass: SnackBarNotifier },
    provideMaterialDefaults(),
    provideRouter(routes),
  ],
};
