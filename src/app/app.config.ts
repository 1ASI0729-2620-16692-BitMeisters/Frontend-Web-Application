import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { routes } from './app.routes';
import {
  BoundedContextTranslateLoader,
  provideTranslationContexts,
} from './shared/infrastructure/i18n/bounded-context-translate-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslationContexts(['shared']),
    provideTranslateService({
      loader: provideTranslateLoader(BoundedContextTranslateLoader),
      lang: 'en-US',
      fallbackLang: 'en-US',
    }),
  ],
};
