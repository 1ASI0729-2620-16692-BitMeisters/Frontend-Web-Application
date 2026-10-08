import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';

const about = () => import('./shared/presentation/views/about/about').then(m => m.About);
const inspectionRoutes = () => import('./inspection/presentation/inspection.routes').then(m => m.inspectionRoutes);
const incidentRoutes = () => import('./incident/presentation/incident.routes').then(m => m.incidentRoutes);
const vehicleDocumentationRoutes = () => import('./vehicle-documentation/presentation/vehicle-documentation.routes').then(m => m.vehicleDocumentationRoutes);
const fleetRoutes = () => import('./fleet/presentation/fleet.routes').then(m => m.fleetRoutes);
const pageNotFound = () => import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const baseTitle = 'FleetSafe';

export const routes: Routes = [
  { path: 'home', component: Home, title: `${baseTitle} - Home` },
  { path: 'about', loadComponent: about, title: `${baseTitle} - About` },
  { path: 'inspections', loadChildren: inspectionRoutes },
  { path: 'incidents', loadChildren: incidentRoutes, title: `${baseTitle} - Incidents` },
  { path: 'incident', redirectTo: 'incidents', pathMatch: 'full' },
  { path: 'fleet', loadChildren: fleetRoutes, title: `${baseTitle} - Fleet` },
  { path: 'vehicle-documentation', loadChildren: vehicleDocumentationRoutes },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` }
];
