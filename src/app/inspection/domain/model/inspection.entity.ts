import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { InspectionResultEntry } from './inspection-result.entity';
import { InspectionStatus, VehicleOperatingCondition } from './inspection.types';

export class Inspection extends BaseEntity {
  #vehicleId: string;
  #driverId: string;
  #vehiclePlate: string;
  #driverName: string;
  #status: InspectionStatus;
  #odometer: number;
  #startedAt: string;
  #completedAt?: string;
  #results: InspectionResultEntry[];
  #operatingCondition?: VehicleOperatingCondition;
  #failureReason?: string;
  #createdAt?: string;
  #updatedAt?: string;

  constructor(props: {
    id: string;
    vehicleId: string;
    driverId: string;
    vehiclePlate: string;
    driverName: string;
    status: InspectionStatus;
    odometer: number;
    startedAt: string;
    completedAt?: string;
    results?: InspectionResultEntry[];
    operatingCondition?: VehicleOperatingCondition;
    failureReason?: string;
    createdAt?: string;
    updatedAt?: string;
  }) {
    super(props.id);
    this.#vehicleId = props.vehicleId;
    this.#driverId = props.driverId;
    this.#vehiclePlate = props.vehiclePlate;
    this.#driverName = props.driverName;
    this.#status = props.status;
    this.#odometer = props.odometer;
    this.#startedAt = props.startedAt;
    this.#completedAt = props.completedAt;
    this.#results = props.results ?? [];
    this.#operatingCondition = props.operatingCondition;
    this.#failureReason = props.failureReason;
    this.#createdAt = props.createdAt;
    this.#updatedAt = props.updatedAt;
  }

  get vehicleId(): string {
    return this.#vehicleId;
  }

  get driverId(): string {
    return this.#driverId;
  }

  get vehiclePlate(): string {
    return this.#vehiclePlate;
  }

  get driverName(): string {
    return this.#driverName;
  }

  get status(): InspectionStatus {
    return this.#status;
  }

  get odometer(): number {
    return this.#odometer;
  }

  get startedAt(): string {
    return this.#startedAt;
  }

  get completedAt(): string | undefined {
    return this.#completedAt;
  }

  get results(): InspectionResultEntry[] {
    return this.#results;
  }

  get operatingCondition(): VehicleOperatingCondition | undefined {
    return this.#operatingCondition;
  }

  get failureReason(): string | undefined {
    return this.#failureReason;
  }

  get createdAt(): string | undefined {
    return this.#createdAt;
  }

  get updatedAt(): string | undefined {
    return this.#updatedAt;
  }

  set odometer(value: number) {
    this.#odometer = value;
  }

  addResult(result: InspectionResultEntry): void {
    const existingIndex = this.#results.findIndex((r) => r.itemId === result.itemId);
    if (existingIndex >= 0) {
      this.#results[existingIndex] = result;
    } else {
      this.#results.push(result);
    }
  }

  complete(condition: VehicleOperatingCondition, failureReason?: string): void {
    this.#status = 'COMPLETED';
    this.#completedAt = new Date().toISOString();
    this.#operatingCondition = condition;
    this.#failureReason = failureReason;
  }

  isComplete(): boolean {
    return this.#status === 'COMPLETED';
  }
}
