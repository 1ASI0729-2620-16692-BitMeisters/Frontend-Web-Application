import { Injectable, signal } from '@angular/core';
import { CurrentUser, SessionUser } from '../application/current-user';

const DEMO_USER: SessionUser = {
  id: '2c3d4e5f-6a7b-4c8d-9e0f-1a2b3c4d5e6f',
  companyId: '1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d',
  firstName: 'Juan',
  lastName: 'Mendoza',
};

@Injectable()
export class DemoCurrentUser extends CurrentUser {
  readonly user = signal<SessionUser | null>(DEMO_USER).asReadonly();
}
