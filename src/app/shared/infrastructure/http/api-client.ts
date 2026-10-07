import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';

export type QueryParams = Record<string, string | number | boolean>;

@Service()
export class ApiClient {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.platformProviderApiBaseUrl;

  get<TResource, TResult>(
    path: string,
    toResult: (resource: TResource) => TResult,
    params?: QueryParams,
  ): Observable<TResult> {
    return this.http.get<TResource>(this.url(path), { params }).pipe(map(toResult));
  }

  post<TBody, TResource, TResult>(
    path: string,
    body: TBody,
    toResult: (resource: TResource) => TResult,
  ): Observable<TResult> {
    return this.http.post<TResource>(this.url(path), body).pipe(map(toResult));
  }

  patch<TBody, TResource, TResult>(
    path: string,
    body: TBody,
    toResult: (resource: TResource) => TResult,
  ): Observable<TResult> {
    return this.http.patch<TResource>(this.url(path), body).pipe(map(toResult));
  }

  private url(path: string): string {
    return `${this.baseUrl}${path}`;
  }
}
