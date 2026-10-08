import { Routes } from '@angular/router';

const incidentList = () =>
  import('./views/incident-list/incident-list').then((m) => m.IncidentList);
const incidentForm = () =>
  import('./views/incident-form/incident-form').then((m) => m.IncidentForm);
const incidentDetail = () =>
  import('./views/incident-detail/incident-detail').then((m) => m.IncidentDetail);
const correctiveActionForm = () =>
  import('./views/corrective-action-form/corrective-action-form').then(
    (m) => m.CorrectiveActionForm,
  );
const repairForm = () => import('./views/repair-form/repair-form').then((m) => m.RepairForm);
const incidentFollowUpForm = () =>
  import('./views/incident-follow-up-form/incident-follow-up-form').then(
    (m) => m.IncidentFollowUpForm,
  );

/**
 * Route tree for incident presentation views.
 *
 * Route order matters: static segments must precede dynamic ones
 * so that '/incidents/new' is not captured by ':id'.
 */
export const incidentRoutes: Routes = [
  { path: '', loadComponent: incidentList },
  { path: 'new', loadComponent: incidentForm },
  { path: ':id', loadComponent: incidentDetail },
  { path: ':id/edit', loadComponent: incidentForm },
  { path: ':id/corrective-actions/new', loadComponent: correctiveActionForm },
  { path: ':id/repairs/new', loadComponent: repairForm },
  { path: ':id/follow-ups/new', loadComponent: incidentFollowUpForm },
];
