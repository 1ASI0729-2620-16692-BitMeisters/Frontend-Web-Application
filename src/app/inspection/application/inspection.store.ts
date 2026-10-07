import { Service, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, defer, finalize, tap } from 'rxjs';
import { Notifier } from '../../shared/application/notifier';
import { Inspection } from '../domain/model/aggregates/inspection.entity';
import { StartInspectionCommand } from '../domain/model/commands/start-inspection.command';
import { InspectionApi } from '../infrastructure/inspection-api';

@Service()
export class InspectionStore {
  private readonly api = inject(InspectionApi);
  private readonly notifier = inject(Notifier);

  readonly assignedVehicle = rxResource({ stream: () => this.api.getAssignedVehicle() });

  private readonly currentInspectionSignal = signal<Inspection | null>(null);
  readonly currentInspection = this.currentInspectionSignal.asReadonly();

  private readonly startingSignal = signal(false);
  readonly starting = this.startingSignal.asReadonly();

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
}
