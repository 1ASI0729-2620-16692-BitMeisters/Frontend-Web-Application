import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { InspectionResultEntry } from './inspection-result-entry.entity';
import { InspectionStatus } from './inspection-status.enum';

export class Inspection implements BaseEntity {
  #id: string;
  #vehicleId: string;
  #driverId: string;
  #status: InspectionStatus;
  #odometer: number;
  #startedAt: Date;
  #completedAt: Date | null;
  #results: InspectionResultEntry[];
  #createdAt: Date;
  #updatedAt: Date;

  constructor(props: {
    id: string;
    vehicleId: string;
    driverId: string;
    status: InspectionStatus;
    odometer: number;
    startedAt: Date;
    completedAt: Date | null;
    results: InspectionResultEntry[];
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.#id = props.id;
    this.#vehicleId = props.vehicleId;
    this.#driverId = props.driverId;
    this.#status = props.status;
    this.#odometer = props.odometer;
    this.#startedAt = props.startedAt;
    this.#completedAt = props.completedAt;
    this.#results = props.results;
    this.#createdAt = props.createdAt;
    this.#updatedAt = props.updatedAt;
  }

  get id(): string {
    return this.#id;
  }

  set id(value: string) {
    this.#id = value;
  }

  get vehicleId(): string {
    return this.#vehicleId;
  }

  set vehicleId(value: string) {
    this.#vehicleId = value;
  }

  get driverId(): string {
    return this.#driverId;
  }

  set driverId(value: string) {
    this.#driverId = value;
  }

  get status(): InspectionStatus {
    return this.#status;
  }

  set status(value: InspectionStatus) {
    this.#status = value;
  }

  get odometer(): number {
    return this.#odometer;
  }

  set odometer(value: number) {
    this.#odometer = value;
  }

  get startedAt(): Date {
    return this.#startedAt;
  }

  set startedAt(value: Date) {
    this.#startedAt = value;
  }

  get completedAt(): Date | null {
    return this.#completedAt;
  }

  set completedAt(value: Date | null) {
    this.#completedAt = value;
  }

  get results(): InspectionResultEntry[] {
    return this.#results;
  }

  set results(value: InspectionResultEntry[]) {
    this.#results = value;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }

  set createdAt(value: Date) {
    this.#createdAt = value;
  }

  get updatedAt(): Date {
    return this.#updatedAt;
  }

  set updatedAt(value: Date) {
    this.#updatedAt = value;
  }

  resultFor(inspectionItemId: string): InspectionResultEntry | undefined {
    return this.#results.find((entry) => entry.inspectionItemId === inspectionItemId);
  }

  withResult(entry: InspectionResultEntry): Inspection {
    const others = this.#results.filter(
      (current) => current.inspectionItemId !== entry.inspectionItemId,
    );
    return new Inspection({
      id: this.#id,
      vehicleId: this.#vehicleId,
      driverId: this.#driverId,
      status: this.#status,
      odometer: this.#odometer,
      startedAt: this.#startedAt,
      completedAt: this.#completedAt,
      results: [...others, entry],
      createdAt: this.#createdAt,
      updatedAt: new Date(),
    });
  }
}
