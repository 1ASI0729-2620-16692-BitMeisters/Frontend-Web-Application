import { Signal } from '@angular/core';

export interface SessionUser {
  readonly id: string;
  readonly companyId: string;
  readonly firstName: string;
  readonly lastName: string;
}

export abstract class CurrentUser {
  abstract readonly user: Signal<SessionUser | null>;
}
