import { Routes } from '@angular/router';

const startInspection = () =>
  import('./views/start-inspection/start-inspection').then((m) => m.StartInspection);

export const inspectionRoutes: Routes = [
  { path: '', redirectTo: 'new', pathMatch: 'full' },
  { path: 'new', loadComponent: startInspection, title: 'FleetSafe - Start inspection' },
];
