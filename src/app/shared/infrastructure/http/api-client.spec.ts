import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { ApiClient } from './api-client';

interface ItemResource {
  id: string;
  name: string;
}

describe('ApiClient', () => {
  let api: ApiClient;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    api = TestBed.inject(ApiClient);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('prefixes the base url, sends the query params and maps the response', () => {
    let result: string[] = [];
    api
      .get('/items', (resources: ItemResource[]) => resources.map((item) => item.name), {
        isActive: true,
      })
      .subscribe((names) => (result = names));

    const request = http.expectOne(`${environment.platformProviderApiBaseUrl}/items?isActive=true`);
    expect(request.request.method).toBe('GET');
    request.flush([{ id: '1', name: 'Brakes' }]);

    expect(result).toEqual(['Brakes']);
  });

  it('posts the body and maps the created resource', () => {
    let result = '';
    api
      .post('/items', { name: 'Lights' }, (resource: ItemResource) => resource.id)
      .subscribe((id) => (result = id));

    const request = http.expectOne(`${environment.platformProviderApiBaseUrl}/items`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ name: 'Lights' });
    request.flush({ id: '2', name: 'Lights' });

    expect(result).toBe('2');
  });

  it('patches the body and maps the updated resource', () => {
    let result = '';
    api
      .patch('/items/2', { name: 'Horn' }, (resource: ItemResource) => resource.name)
      .subscribe((name) => (result = name));

    const request = http.expectOne(`${environment.platformProviderApiBaseUrl}/items/2`);
    expect(request.request.method).toBe('PATCH');
    expect(request.request.body).toEqual({ name: 'Horn' });
    request.flush({ id: '2', name: 'Horn' });

    expect(result).toBe('Horn');
  });
});
