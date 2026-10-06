import { AuditableAggregateRoot } from '../../../../shared/domain/model/auditable-aggregate-root';
import { InspectionItem } from './inspection-item.entity';
import { InspectionResultEntry } from '../entities/inspection-result-entry.entity';
import { InspectionStatus } from '../valueobjects/inspection-status.enum';

export class Inspection extends AuditableAggregateRoot {
  readonly vehicleId: string;
  readonly driverId: string;
  readonly status: InspectionStatus;
  readonly odometer: number;
  readonly startedAt: Date;
  readonly completedAt: Date | null;
  readonly results: readonly InspectionResultEntry[];

  constructor(props: {
    id: string;
    vehicleId: string;
    driverId: string;
    status: InspectionStatus;
    odometer: number;
    startedAt: Date;
    completedAt: Date | null;
    results: readonly InspectionResultEntry[];
    createdAt: Date;
    updatedAt: Date;
  }) {
    super(props.id, props.createdAt, props.updatedAt);
    this.vehicleId = props.vehicleId;
    this.driverId = props.driverId;
    this.status = props.status;
    this.odometer = props.odometer;
    this.startedAt = props.startedAt;
    this.completedAt = props.completedAt;
    this.results = props.results;
  }

  isInProgress(): boolean {
    return this.status === InspectionStatus.IN_PROGRESS;
  }

  resultFor(inspectionItemId: string): InspectionResultEntry | undefined {
    return this.results.find((entry) => entry.inspectionItemId === inspectionItemId);
  }

  findings(): InspectionResultEntry[] {
    return this.results.filter((entry) => entry.isFinding());
  }

  pendingItems(catalog: readonly InspectionItem[]): InspectionItem[] {
    return catalog.filter((item) => item.isActive && !this.isResolved(item));
  }

  canComplete(catalog: readonly InspectionItem[]): boolean {
    return this.isInProgress() && this.pendingItems(catalog).length === 0;
  }

  private isResolved(item: InspectionItem): boolean {
    const entry = this.resultFor(item.id);
    if (!entry) return false;
    if (entry.requiresObservation() && !entry.hasObservation()) return false;
    if (item.demandsEvidenceFor(entry.result) && !entry.hasEvidence()) return false;
    return true;
  }
}
