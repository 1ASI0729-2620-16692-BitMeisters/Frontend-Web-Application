import { Service, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, defer, finalize, of, tap, throwError } from 'rxjs';
import { Notifier } from '../../shared/application/notifier';
import { Inspection } from '../domain/model/aggregates/inspection.entity';
import { RegisterInspectionResultCommand } from '../domain/model/commands/register-inspection-result.command';
import { StartInspectionCommand } from '../domain/model/commands/start-inspection.command';
import { UpdateInspectionResultCommand } from '../domain/model/commands/update-inspection-result.command';
import { InspectionResultEntry } from '../domain/model/entities/inspection-result-entry.entity';
import { ResultValue } from '../domain/model/valueobjects/result-value.enum';
import { InspectionApi } from '../infrastructure/inspection-api';

@Service()
export class InspectionStore {
  private readonly api = inject(InspectionApi);
  private readonly notifier = inject(Notifier);

  readonly assignedVehicle = rxResource({ stream: () => this.api.getAssignedVehicle() });
  readonly inspectionItems = rxResource({ stream: () => this.api.getActiveInspectionItems() });

  private readonly currentInspectionSignal = signal<Inspection | null>(null);
  readonly currentInspection = this.currentInspectionSignal.asReadonly();

  private readonly startingSignal = signal(false);
  readonly starting = this.startingSignal.asReadonly();

  private readonly savingItemIdSignal = signal<string | null>(null);
  readonly savingItemId = this.savingItemIdSignal.asReadonly();

  startInspection(command: StartInspectionCommand): Observable<Inspection> {
    return defer(() => {
      this.startingSignal.set(true);
      return this.api.startInspection(command);
    }).pipe(
      tap((inspection) => {
        this.currentInspectionSignal.set(inspection);
        this.notifier.success('inspection.notifications.started');
      }),
      finalize(() => this.startingSignal.set(false)),
    );
  }

  loadInspection(id: string): Observable<Inspection> {
    return this.api
      .getInspection(id)
      .pipe(tap((inspection) => this.currentInspectionSignal.set(inspection)));
  }

  answerItem(inspectionItemId: string, result: ResultValue): Observable<InspectionResultEntry> {
    return defer(() => {
      const inspection = this.currentInspectionSignal();
      if (!inspection) return throwError(() => new Error('There is no inspection in progress.'));

      const existing = inspection.resultFor(inspectionItemId);
      if (existing?.result === result) return of(existing);

      this.savingItemIdSignal.set(inspectionItemId);
      return existing
        ? this.api.updateResult(
            new UpdateInspectionResultCommand({
              inspectionId: inspection.id,
              resultId: existing.id,
              result,
            }),
          )
        : this.api.registerResult(
            new RegisterInspectionResultCommand({
              inspectionId: inspection.id,
              inspectionItemId,
              result,
            }),
          );
    }).pipe(
      tap((entry) =>
        this.currentInspectionSignal.update((current) => current?.withResult(entry) ?? current),
      ),
      finalize(() => this.savingItemIdSignal.set(null)),
    );
  }
}
