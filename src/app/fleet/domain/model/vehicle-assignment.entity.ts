import { BaseEntity } from '../../../shared/domain/model/base-entity';

export interface VehicleAssignmentProps {
  id: string;
  vehicleId: string;
  driverId: string;
  assignedFrom: string;
  assignedTo: string | null;
  isActive: boolean;
  createdAt?: string;
}

export class VehicleAssignment implements BaseEntity<string> {
  #id: string;
  #vehicleId: string;
  #driverId: string;
  #assignedFrom: string;
  #assignedTo: string | null;
  #isActive: boolean;
  #createdAt?: string;

  constructor(props: VehicleAssignmentProps) {
    this.#id = props.id;
    this.#vehicleId = props.vehicleId;
    this.#driverId = props.driverId;
    this.#assignedFrom = props.assignedFrom;
    this.#assignedTo = props.assignedTo;
    this.#isActive = props.isActive;
    this.#createdAt = props.createdAt;
  }

  get id(): string {
    return this.#id;
  }

  get vehicleId(): string {
    return this.#vehicleId;
  }

  get driverId(): string {
    return this.#driverId;
  }

  get assignedFrom(): string {
    return this.#assignedFrom;
  }

  get assignedTo(): string | null {
    return this.#assignedTo;
  }

  get isActive(): boolean {
    return this.#isActive;
  }

  get createdAt(): string | undefined {
    return this.#createdAt;
  }

  isActiveOn(date: Date): boolean {
    const from = new Date(`${this.#assignedFrom}T00:00:00`);
    const to = this.#assignedTo ? new Date(`${this.#assignedTo}T23:59:59`) : null;

    return this.#isActive && from <= date && (!to || date <= to);
  }

  close(endDate: string): void {
    this.#assignedTo = endDate;
    this.#isActive = false;
  }
}
