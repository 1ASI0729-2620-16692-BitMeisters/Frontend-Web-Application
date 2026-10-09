import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';

const about = () => import('./shared/presentation/views/about/about').then(m => m.About);
const inspectionRoutes = () => import('./inspection/presentation/inspection.routes').then(m => m.inspectionRoutes);
const incidentRoutes = () => import('./incident/presentation/incident.routes').then(m => m.incidentRoutes);
const vehicleDocumentationRoutes = () => import('./vehicle-documentation/presentation/vehicle-documentation.routes').then(m => m.vehicleDocumentationRoutes);
const fleetRoutes = () => import('./fleet/presentation/fleet.routes').then(m => m.fleetRoutes);
const pageNotFound = () => import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);

export const routes: Routes = [
  { path: 'home', component: Home, title: 'titles.home' },
  { path: 'about', loadComponent: about, title: 'titles.about' },
  { path: 'inspections', loadChildren: inspectionRoutes },
  { path: 'incidents', loadChildren: incidentRoutes, title: 'titles.incidents' },
  { path: 'incident', redirectTo: 'incidents', pathMatch: 'full' },
  { path: 'fleet', loadChildren: fleetRoutes, title: 'titles.fleet' },
  { path: 'vehicle-documentation', loadChildren: vehicleDocumentationRoutes },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', loadComponent: pageNotFound, title: 'titles.pageNotFound' }
];
