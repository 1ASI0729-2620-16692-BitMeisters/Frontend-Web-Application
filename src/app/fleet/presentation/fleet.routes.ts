import { Routes } from '@angular/router';

const fleetList = () => import('./views/fleet-list/fleet-list').then((m) => m.FleetList);

const vehicleList = () => import('./views/vehicle-list/vehicle-list').then((m) => m.VehicleList);

const vehicleForm = () => import('./views/vehicle-form/vehicle-form').then((m) => m.VehicleForm);

const vehicleDetail = () =>
  import('./views/vehicle-detail/vehicle-detail').then((m) => m.VehicleDetail);

const driverList = () => import('./views/driver-list/driver-list').then((m) => m.DriverList);

const vehicleAssignment = () =>
  import('./views/vehicle-assignment/vehicle-assignment').then((m) => m.VehicleAssignment);

export const fleetRoutes: Routes = [
  {
    path: '',
    loadComponent: fleetList,
  },
  {
    path: 'vehicles',
    loadComponent: vehicleList,
  },
  {
    path: 'vehicles/new',
    loadComponent: vehicleForm,
  },
  {
    path: 'vehicles/:id/edit',
    loadComponent: vehicleForm,
  },
  {
    path: 'vehicles/:id',
    loadComponent: vehicleDetail,
  },
  {
    path: 'drivers',
    loadComponent: driverList,
  },
  {
    path: 'assignments',
    loadComponent: vehicleAssignment,
  },
];
