import { Routes } from '@angular/router';
export const vehicleDocumentationRoutes: Routes = [
  { path: '', loadComponent: () => import('./views/document-list/document-list').then(m => m.DocumentList), title: 'FleetSafe - Vehicle Documentation' },
];
