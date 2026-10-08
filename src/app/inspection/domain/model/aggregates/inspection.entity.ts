import { AuditableAggregateRoot } from '../../../../shared/domain/model/auditable-aggregate-root';
import { InspectionResultEntry } from '../entities/inspection-result-entry.entity';
import { InspectionStatus } from '../valueobjects/inspection-status.enum';

export interface InspectionProps {
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
}

export class Inspection extends AuditableAggregateRoot {
  readonly vehicleId: string;
  readonly driverId: string;
  readonly status: InspectionStatus;
  readonly odometer: number;
  readonly startedAt: Date;
  readonly completedAt: Date | null;
  readonly results: readonly InspectionResultEntry[];

  constructor(props: InspectionProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this.vehicleId = props.vehicleId;
    this.driverId = props.driverId;
    this.status = props.status;
    this.odometer = props.odometer;
    this.startedAt = props.startedAt;
    this.completedAt = props.completedAt;
    this.results = props.results;
  }

  resultFor(inspectionItemId: string): InspectionResultEntry | undefined {
    return this.results.find((entry) => entry.inspectionItemId === inspectionItemId);
  }

  withResult(entry: InspectionResultEntry): Inspection {
    const others = this.results.filter(
      (current) => current.inspectionItemId !== entry.inspectionItemId,
    );
    return new Inspection({
      id: this.id,
      vehicleId: this.vehicleId,
      driverId: this.driverId,
      status: this.status,
      odometer: this.odometer,
      startedAt: this.startedAt,
      completedAt: this.completedAt,
      results: [...others, entry],
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }
}
