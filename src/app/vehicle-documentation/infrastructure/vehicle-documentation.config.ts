import { InjectionToken } from '@angular/core';
/** Override this token at application level when the real REST API is available. */
export const VEHICLE_DOCUMENTATION_CONFIG = new InjectionToken<{ baseUrl: string; alertDays: number }>(
  'VEHICLE_DOCUMENTATION_CONFIG', { providedIn: 'root', factory: () => ({ baseUrl: 'http://localhost:3001/api/v1', alertDays: 30 }) },
);
