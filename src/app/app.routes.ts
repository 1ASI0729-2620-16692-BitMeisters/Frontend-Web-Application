import { Routes } from '@angular/router';
import { Home } from './shared/presentation/view/home/home';

const about = () => import('./shared/presentation/view/about/about').then((m) => m.About);

const fleet = () => import('./fleet/presentation/fleet.routes').then((m) => m.fleetRoutes);

const pageNotFound = () =>
  import('./shared/presentation/view/page-not-found/page-not-found').then((m) => m.PageNotFound);

const baseTitle = 'FleetSafe';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', },
  { path: 'home', component: Home, title: `${baseTitle} - Home`, },
  { path: 'about', loadComponent: about, title: `${baseTitle} - About`, },
  { path: 'fleet', loadChildren: fleet, title: `${baseTitle} - Fleet`, },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` }

];



