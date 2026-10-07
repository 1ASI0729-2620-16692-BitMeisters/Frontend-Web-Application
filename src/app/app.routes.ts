import { Routes } from '@angular/router';
import { Home } from './shared/presentation/view/home/home';

const about = () => import('./shared/presentation/view/about/about').then(m => m.About);
const inspection = () => import('./inspection/presentation/inspection.routes').then(m => m.inspectionRoutes);
const pageNotFound = () => import('./shared/presentation/view/page-not-found/page-not-found').then(m => m.PageNotFound);
const baseTitle = 'FleetSafe';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home, title: `${baseTitle} - Home` },
  { path: 'about', loadComponent: about, title: `${baseTitle} - About` },
  { path: 'inspections', loadChildren: inspection },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` }
];



