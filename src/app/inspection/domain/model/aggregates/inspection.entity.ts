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
}
