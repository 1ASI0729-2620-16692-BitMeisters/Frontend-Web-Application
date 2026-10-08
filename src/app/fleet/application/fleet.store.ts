import { computed, DestroyRef, inject, Injectable, Signal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';

import { FleetApi } from '../infrastructure/fleet-api';

import { Company } from '../domain/model/company.entity';
import { Fleet } from '../domain/model/fleet.entity';
import { Vehicle } from '../domain/model/vehicle.entity';
import { Driver } from '../domain/model/driver.entity';
import { VehicleAssignment } from '../domain/model/vehicle-assignment.entity';

@Injectable({
  providedIn: 'root',
})
export class FleetStore {
  private readonly fleetApi = inject(FleetApi);

  private readonly companiesSignal = signal<Company[]>([]);
  readonly companies = this.companiesSignal.asReadonly();

  private readonly fleetsSignal = signal<Fleet[]>([]);
  readonly fleets = this.fleetsSignal.asReadonly();

  private readonly vehiclesSignal = signal<Vehicle[]>([]);
  readonly vehicles = this.vehiclesSignal.asReadonly();

  private readonly driversSignal = signal<Driver[]>([]);
  readonly drivers = this.driversSignal.asReadonly();

  private readonly vehicleAssignmentsSignal = signal<VehicleAssignment[]>([]);
  readonly vehicleAssignments = this.vehicleAssignmentsSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  readonly companyCount = computed(() => this.companies().length);

  readonly fleetCount = computed(() => this.fleets().length);

  readonly vehicleCount = computed(() => this.vehicles().length);

  readonly driverCount = computed(() => this.drivers().length);

  readonly activeAssignmentCount = computed(
    () => this.vehicleAssignments().filter((assignment) => assignment.isActive).length,
  );

  readonly availableVehicles = computed(() =>
    this.vehicles().filter(
      (vehicle) => vehicle.getActiveAssignment(this.vehicleAssignments()) === null,
    ),
  );

  readonly availableDrivers = computed(() =>
    this.drivers().filter(
      (driver) =>
        driver.getActiveAssignment(this.vehicleAssignments()) === null && driver.hasValidLicense(),
    ),
  );

  constructor() {
    this.loadCompanies();
    this.loadFleets();
    this.loadVehicles();
    this.loadDrivers();
    this.loadVehicleAssignments();
  }

  getVehicleById = (id: string): Signal<Vehicle | undefined> =>
    computed(() => this.vehicles().find((vehicle) => vehicle.id === id));

  getDriverById = (id: string): Signal<Driver | undefined> =>
    computed(() => this.drivers().find((driver) => driver.id === id));

  getFleetById = (id: string): Signal<Fleet | undefined> =>
    computed(() => this.fleets().find((fleet) => fleet.id === id));

  private loadCompanies = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.fleetApi
      .getCompanies()
      .pipe(retry(2), takeUntilDestroyed())
      .subscribe({
        next: (companies) => {
          this.companiesSignal.set(companies);
          this.loadingSignal.set(false);
        },
        error: (error) => {
          this.errorSignal.set(this.formatError(error, 'Failed to load companies'));
          this.loadingSignal.set(false);
        },
      });
  };

  private loadFleets = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.fleetApi
      .getFleets()
      .pipe(retry(2), takeUntilDestroyed())
      .subscribe({
        next: (fleets) => {
          this.fleetsSignal.set(fleets);
          this.loadingSignal.set(false);
        },
        error: (error) => {
          this.errorSignal.set(this.formatError(error, 'Failed to load fleets'));
          this.loadingSignal.set(false);
        },
      });
  };

  loadVehicles = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.fleetApi
      .getVehicles()
      .pipe(retry(2), takeUntilDestroyed())
      .subscribe({
        next: (vehicles) => {
          this.vehiclesSignal.set(vehicles);
          this.loadingSignal.set(false);
        },
        error: (error) => {
          this.errorSignal.set(this.formatError(error, 'Failed to load vehicles'));
          this.loadingSignal.set(false);
        },
      });
  };

  loadDrivers = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.fleetApi
      .getDrivers()
      .pipe(retry(2), takeUntilDestroyed())
      .subscribe({
        next: (drivers) => {
          this.driversSignal.set(drivers);
          this.loadingSignal.set(false);
        },
        error: (error) => {
          this.errorSignal.set(this.formatError(error, 'Failed to load drivers'));
          this.loadingSignal.set(false);
        },
      });
  };

  loadVehicleAssignments = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.fleetApi
      .getVehicleAssignments()
      .pipe(retry(2), takeUntilDestroyed())
      .subscribe({
        next: (assignments) => {
          this.vehicleAssignmentsSignal.set(assignments);
          this.loadingSignal.set(false);
        },
        error: (error) => {
          this.errorSignal.set(this.formatError(error, 'Failed to load vehicle assignments'));
          this.loadingSignal.set(false);
        },
      });
  };

  addVehicle = (vehicle: Vehicle): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.fleetApi
      .createVehicle(vehicle)
      .pipe(retry(2))
      .subscribe({
        next: (createdVehicle) => {
          this.vehiclesSignal.update((vehicles) => [...vehicles, createdVehicle]);
          this.loadingSignal.set(false);
        },
        error: (error) => {
          this.errorSignal.set(this.formatError(error, 'Failed to create vehicle'));
          this.loadingSignal.set(false);
        },
      });
  };

  updateVehicle = (vehicle: Vehicle): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.fleetApi
      .updateVehicle(vehicle)
      .pipe(retry(2))
      .subscribe({
        next: (updatedVehicle) => {
          this.vehiclesSignal.update((vehicles) =>
            vehicles.map((currentVehicle) =>
              currentVehicle.id === updatedVehicle.id ? updatedVehicle : currentVehicle,
            ),
          );

          this.loadingSignal.set(false);
        },
        error: (error) => {
          this.errorSignal.set(this.formatError(error, 'Failed to update vehicle'));
          this.loadingSignal.set(false);
        },
      });
  };

  deleteVehicle = (id: string): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.fleetApi
      .deleteVehicle(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.vehiclesSignal.update((vehicles) => vehicles.filter((vehicle) => vehicle.id !== id));

          this.loadingSignal.set(false);
        },
        error: (error) => {
          this.errorSignal.set(this.formatError(error, 'Failed to delete vehicle'));
          this.loadingSignal.set(false);
        },
      });
  };

  assignVehicle = (assignment: VehicleAssignment): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.fleetApi
      .createVehicleAssignment(assignment)
      .pipe(retry(2))
      .subscribe({
        next: (createdAssignment) => {
          this.vehicleAssignmentsSignal.update((assignments) => [
            ...assignments,
            createdAssignment,
          ]);

          this.loadingSignal.set(false);
        },
        error: (error) => {
          this.errorSignal.set(this.formatError(error, 'Failed to assign vehicle'));
          this.loadingSignal.set(false);
        },
      });
  };

  private formatError = (error: unknown, fallback: string): string => {
    if (error instanceof Error) {
      return error.message;
    }

    return fallback;
  };
}
