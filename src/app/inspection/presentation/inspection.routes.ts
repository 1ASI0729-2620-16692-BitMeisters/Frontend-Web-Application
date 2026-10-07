import { Routes } from '@angular/router';

const inspectionView = () =>
  import('./views/inspection-view/inspection-view').then((m) => m.InspectionView);

export const inspectionRoutes: Routes = [
  {
    path: '',
    loadComponent: inspectionView,
  },
];
