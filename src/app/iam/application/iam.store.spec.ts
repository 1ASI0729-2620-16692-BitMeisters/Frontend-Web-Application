import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Role } from '../domain/model/role.enum';
import { SignInCommand } from '../domain/model/sign-in.command';
import { IamApi } from '../infrastructure/iam-api';
import { SignInResource } from '../infrastructure/sign-in-response';
import { IamStore } from './iam.store';

const session = (expiresAt: number): SignInResource => ({
  token: 'access-token',
  expiresAt,
  user: {
    id: 'user-1',
    companyId: 'company-1',
    email: 'ana.quispe@andinos.pe',
    firstName: 'Ana',
    lastName: 'Quispe',
    role: Role.FLEET_SUPERVISOR,
    isActive: true,
    createdAt: '2026-10-28T14:00:00Z',
    updatedAt: '2026-10-28T14:00:00Z',
  },
});

describe('IamStore', () => {
  const api = { signIn: vi.fn() };
  const router = { navigateByUrl: vi.fn(() => Promise.resolve(true)) } as unknown as Router;
  const credentials = new SignInCommand({ email: 'ana.quispe@andinos.pe', password: 'S3cure!pass' });

  function createStore(): IamStore {
    TestBed.configureTestingModule({ providers: [{ provide: IamApi, useValue: api }] });
    return TestBed.inject(IamStore);
  }

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('keeps the session and goes to the requested page after signing in', () => {
    api.signIn.mockReturnValue(of(session(Date.now() + 60_000)));
    const store = createStore();

    store.signIn(credentials, router, '/fleet');

    expect(store.isSignedIn()).toBe(true);
    expect(store.currentToken()).toBe('access-token');
    expect(store.currentUser()?.fullName).toBe('Ana Quispe');
    expect(store.hasRole(Role.FLEET_SUPERVISOR)).toBe(true);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/fleet');
  });

  it('reports wrong credentials without signing in', () => {
    api.signIn.mockReturnValue(throwError(() => new HttpErrorResponse({ status: 401 })));
    const store = createStore();

    store.signIn(credentials, router);

    expect(store.isSignedIn()).toBe(false);
    expect(store.error()).toBe('iam.signIn.invalidCredentials');
  });

  it('restores a session that has not expired', () => {
    localStorage.setItem('fleetsafe-session', JSON.stringify(session(Date.now() + 60_000)));

    expect(createStore().isSignedIn()).toBe(true);
  });

  it('discards an expired session', () => {
    localStorage.setItem('fleetsafe-session', JSON.stringify(session(Date.now() - 1)));

    expect(createStore().isSignedIn()).toBe(false);
    expect(localStorage.getItem('fleetsafe-session')).toBeNull();
  });
});
