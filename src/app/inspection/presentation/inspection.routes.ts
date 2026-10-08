import { Routes } from '@angular/router';

const startInspection = () =>
  import('./views/start-inspection/start-inspection').then((m) => m.StartInspection);

const inspectionChecklist = () =>
  import('./views/inspection-checklist/inspection-checklist').then((m) => m.InspectionChecklist);

export const inspectionRoutes: Routes = [
  { path: '', redirectTo: 'new', pathMatch: 'full' },
  { path: 'new', loadComponent: startInspection, title: 'FleetSafe - Start inspection' },
  {
    path: ':id/execute',
    loadComponent: inspectionChecklist,
    title: 'FleetSafe - Inspection checklist',
  },
];
