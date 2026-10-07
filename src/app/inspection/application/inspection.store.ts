import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, retry, tap } from 'rxjs';

import { InspectionApi } from '../infrastructure/inspection-api';
import { InspectionItem } from '../domain/model/inspection-item.entity';
import { Inspection } from '../domain/model/inspection.entity';
import { InspectionResultEntry } from '../domain/model/inspection-result.entity';
import { Observation } from '../domain/model/observation.entity';
import { Evidence } from '../domain/model/evidence.entity';
import { ResultValue, VehicleOperatingCondition } from '../domain/model/inspection.types';

@Injectable({
  providedIn: 'root',
})
export class InspectionStore {
  private readonly inspectionApi = inject(InspectionApi);

  private readonly itemsSignal = signal<InspectionItem[]>([]);
  readonly items = this.itemsSignal.asReadonly();

  private readonly inspectionsSignal = signal<Inspection[]>([]);
  readonly inspections = this.inspectionsSignal.asReadonly();

  private readonly activeInspectionSignal = signal<Inspection | null>(null);
  readonly activeInspection = this.activeInspectionSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  // Dashboard & evaluation computed metrics
  readonly totalInspectionsCount = computed(() => this.inspections().length);

  readonly enabledCount = computed(
    () => this.inspections().filter((i) => i.operatingCondition === 'ENABLED').length,
  );

  readonly observedCount = computed(
    () => this.inspections().filter((i) => i.operatingCondition === 'OBSERVED').length,
  );

  readonly notEnabledCount = computed(
    () => this.inspections().filter((i) => i.operatingCondition === 'NOT_ENABLED').length,
  );

  readonly exceptionCount = computed(
    () =>
      this.inspections().filter((i) => i.results.some((r) => r.isCriticalFailure()))
        .length,
  );

  readonly itemCount = computed(() => this.items().length);

  readonly answeredCount = computed(() => this.activeInspection()?.results.length ?? 0);

  readonly progressPercentage = computed(() => {
    const total = this.items().length;
    if (total === 0) return 0;
    return Math.round((this.answeredCount() / total) * 100);
  });

  readonly isChecklistComplete = computed(
    () => this.items().length > 0 && this.answeredCount() === this.items().length,
  );

  constructor() {
    this.loadItems();
    this.loadInspections();
  }

  getInspectionById = (id: string): Signal<Inspection | undefined> =>
    computed(() => this.inspections().find((inspection) => inspection.id === id));

  loadItems = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.inspectionApi
      .getInspectionItems()
      .pipe(retry(2), takeUntilDestroyed())
      .subscribe({
        next: (items) => {
          const sorted = [...items].sort((a, b) => a.orderIndex - b.orderIndex);
          this.itemsSignal.set(sorted);
          this.loadingSignal.set(false);
        },
        error: (error) => {
          this.errorSignal.set(this.formatError(error, 'Failed to load inspection items'));
          this.loadingSignal.set(false);
        },
      });
  };

  loadInspections = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.inspectionApi
      .getInspections()
      .pipe(retry(2), takeUntilDestroyed())
      .subscribe({
        next: (inspections) => {
          this.inspectionsSignal.set(inspections);
          this.loadingSignal.set(false);
        },
        error: (error) => {
          this.errorSignal.set(this.formatError(error, 'Failed to load inspections'));
          this.loadingSignal.set(false);
        },
      });
  };

  startInspection = (
    vehicleId: string,
    vehiclePlate: string,
    driverId: string,
    driverName: string,
    odometer: number,
  ): Inspection => {
    const inspection = new Inspection({
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      vehicleId,
      driverId,
      vehiclePlate,
      driverName,
      status: 'IN_PROGRESS',
      odometer,
      startedAt: new Date().toISOString(),
      results: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    this.activeInspectionSignal.set(inspection);
    return inspection;
  };

  recordResult = (
    item: InspectionItem,
    result: ResultValue,
    observation?: Observation,
  ): void => {
    const current = this.activeInspection();
    if (!current) return;

    const resultEntry = new InspectionResultEntry({
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      itemId: item.id,
      itemName: item.name,
      itemCategory: item.category,
      isCriticalSafety: item.isCriticalSafety,
      result,
      observation,
    });

    current.addResult(resultEntry);
    this.activeInspectionSignal.set(current);
  };

  saveObservation = (itemId: string, notes: string, photoUrl?: string): void => {
    const current = this.activeInspection();
    if (!current) return;

    const entry = current.results.find((r) => r.itemId === itemId);
    if (!entry) return;

    let evidence: Evidence | undefined;
    if (photoUrl) {
      evidence = new Evidence({
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        photoUrl,
        capturedAt: new Date().toISOString(),
      });
    }

    const observation = new Observation({
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      notes,
      evidence,
    });

    entry.setObservation(observation);
    this.activeInspectionSignal.set(current);
  };

  evaluateCondition = (
    inspection: Inspection,
  ): { condition: VehicleOperatingCondition; failureReason?: string } => {
    const criticalFailure = inspection.results.find(
      (r) => r.isCriticalSafety && r.result === 'FAIL',
    );
    if (criticalFailure) {
      return {
        condition: 'NOT_ENABLED',
        failureReason: `Falla crítica de seguridad en elemento: ${criticalFailure.itemName}`,
      };
    }

    const hasMinorFailures = inspection.results.some(
      (r) => !r.isCriticalSafety && r.result === 'FAIL',
    );
    const hasObservations = inspection.results.some((r) => !!r.observation);

    if (hasMinorFailures || hasObservations) {
      return {
        condition: 'OBSERVED',
        failureReason: 'Elementos secundarios observados o con fallas menores',
      };
    }

    return { condition: 'ENABLED' };
  };

  submitInspection = (): Observable<Inspection> => {
    const current = this.activeInspection();
    if (!current) {
      throw new Error('No active inspection to submit');
    }

    const { condition, failureReason } = this.evaluateCondition(current);
    current.complete(condition, failureReason);

    this.loadingSignal.set(true);
    return this.inspectionApi.createInspection(current).pipe(
      tap({
        next: (created) => {
          this.inspectionsSignal.update((list) => [created, ...list]);
          this.activeInspectionSignal.set(created);
          this.loadingSignal.set(false);
        },
        error: (error) => {
          this.errorSignal.set(this.formatError(error, 'Failed to submit inspection'));
          this.loadingSignal.set(false);
        },
      }),
    );
  };

  private formatError = (error: unknown, fallback: string): string => {
    if (error instanceof Error) {
      return error.message;
    }
    return fallback;
  };
}
