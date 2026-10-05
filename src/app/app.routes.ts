import { Routes } from '@angular/router';
import { Home } from './shared/presentation/view/home/home';

const about = () => import('./shared/presentation/view/about/about').then((m) => m.About);
const pageNotFound = () =>
  import('./shared/presentation/view/page-not-found/page-not-found').then((m) => m.PageNotFound);
const incidentRoutes = () =>
  import('./incident/presentation/incident.routes').then((m) => m.incidentRoutes);

const baseTitle = 'FleetSafe';

export const routes: Routes = [
  { path: 'home', component: Home, title: `${baseTitle} - Inicio` },
  { path: 'about', loadComponent: about, title: `${baseTitle} - Acerca de` },
  {
    path: 'incidents',
    loadChildren: incidentRoutes,
    title: `${baseTitle} - Incidencias`,
  },
  { path: 'incident', redirectTo: 'incidents', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Página no encontrada` },
];
