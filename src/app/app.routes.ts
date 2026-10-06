import { Routes } from '@angular/router';
import { Home } from './shared/presentation/view/home/home';

const about = () => import('./shared/presentation/view/about/about').then(m => m.About);
const pageNotFound = () => import('./shared/presentation/view/page-not-found/page-not-found').then(m => m.PageNotFound);
const baseTitle = 'FleetSafe';

export const routes: Routes = [
  { path: '', redirectTo: 'vehicle-documentation', pathMatch: 'full' },
  { path: 'vehicle-documentation', loadChildren: () => import('./vehicle-documentation/presentation/vehicle-documentation.routes').then(m => m.vehicleDocumentationRoutes) },
  { path: 'app/documents', redirectTo: 'vehicle-documentation', pathMatch: 'full' },
  { path: 'home', component: Home, title: `${baseTitle} - Home` },
  { path: 'about', loadComponent: about, title: `${baseTitle} - About` },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` }
];



