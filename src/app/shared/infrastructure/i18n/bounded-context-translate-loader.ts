import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken, Provider, inject } from '@angular/core';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';

const TRANSLATION_CONTEXTS = new InjectionToken<readonly string[]>('TRANSLATION_CONTEXTS');

@Injectable()
export class BoundedContextTranslateLoader extends TranslateLoader {
  private readonly http = new HttpClient(inject(HttpBackend));
  private readonly contexts = inject(TRANSLATION_CONTEXTS);

  getTranslation(language: string): Observable<TranslationObject> {
    const translations = this.contexts.map((context) => this.load(context, language));
    return forkJoin(translations).pipe(
      map((dictionaries) => Object.assign({}, ...dictionaries)),
    );
  }

  private load(context: string, language: string): Observable<TranslationObject> {
    return this.http.get<TranslationObject>(`/i18n/${context}/${language}.json`).pipe(
      catchError(() => {
        console.warn(`Missing translations for context "${context}" in "${language}".`);
        return of({});
      }),
    );
  }
}

export function provideTranslationContexts(contexts: readonly string[]): Provider {
  return { provide: TRANSLATION_CONTEXTS, useValue: contexts };
}
