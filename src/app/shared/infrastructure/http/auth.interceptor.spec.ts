import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  it('sends the access token as a bearer authorization header when there is one', () => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    const http = TestBed.inject(HttpTestingController);

    TestBed.inject(HttpClient).get('/inspections').subscribe();

    const request = http.expectOne('/inspections');
    const expected = environment.demoAccessToken ? `Bearer ${environment.demoAccessToken}` : null;
    expect(request.request.headers.get('Authorization')).toBe(expected);
    request.flush([]);
    http.verify();
  });
});
