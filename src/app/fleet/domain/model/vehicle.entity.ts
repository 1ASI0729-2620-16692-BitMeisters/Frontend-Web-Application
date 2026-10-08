import { BaseEntity } from '../../../shared/domain/model/base-entity';
import type { VehicleAssignment } from './vehicle-assignment.entity';

export enum VehicleStatus {
  ENABLED = 'ENABLED',
  OBSERVED = 'OBSERVED',
  NOT_ENABLED = 'NOT_ENABLED'
}
export enum VehicleType{
  THIN = 'THIN',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE'
}

export class Vehicle implements BaseEntity {
  #id: string;
  #fleetId: string;
  #plate: string;
  #brand: string;
  #model: string;
  #year: number;
  #type: VehicleType;
  #capacity: number;
  #currentStatus: VehicleStatus;
  #createdAt?: string;
  #updatedAt?: string;

  constructor(props: {
    id: string;
    fleetId: string;
    plate: string;
    brand: string;
    model: string;
    year: number;
    type: VehicleType;
    capacity: number;
    currentStatus: VehicleStatus;
    createdAt?: string;
    updatedAt?: string;
  }) {
    this.#id = props.id;
    this.#fleetId = props.fleetId;
    this.#plate = props.plate;
    this.#brand = props.brand;
    this.#model = props.model;
    this.#year = props.year;
    this.#type = props.type;
    this.#capacity = props.capacity;
    this.#currentStatus = props.currentStatus;
    this.#createdAt = props.createdAt;
    this.#updatedAt = props.updatedAt;
  }

  get id(): string {
    return this.#id;
  }

  get fleetId(): string {
    return this.#fleetId;
  }

  get plate(): string {
    return this.#plate;
  }

  get brand(): string {
    return this.#brand;
  }

  get model(): string {
    return this.#model;
  }

  get year(): number {
    return this.#year;
  }

  get type(): VehicleType {
    return this.#type;
  }

  get capacity(): number {
    return this.#capacity;
  }

  get currentStatus(): VehicleStatus {
    return this.#currentStatus;
  }

  get createdAt(): string | undefined {
    return this.#createdAt;
  }

  get updatedAt(): string | undefined {
    return this.#updatedAt;
  }

  applyAuthorizationResult(status: VehicleStatus): void {
    this.#currentStatus = status;
  }

  isOperational(): boolean {
    return this.#currentStatus === VehicleStatus.ENABLED;
  }

  getActiveAssignment(assignments: readonly VehicleAssignment[]): VehicleAssignment | null {
    return (
      assignments.find(
        (assignment) => assignment.vehicleId === this.#id && assignment.isActiveOn(new Date()),
      ) ?? null
    );
  }
}
