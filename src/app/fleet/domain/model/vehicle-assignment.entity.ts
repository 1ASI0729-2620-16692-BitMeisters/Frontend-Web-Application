import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class VehicleAssignment implements BaseEntity {
  #id: string;
  #vehicleId: string;
  #driverId: string;
  #assignedFrom: string;
  #assignedTo: string | null;
  #isActive: boolean;
  #createdAt?: string;

  constructor(props: {
    id: string;
    vehicleId: string;
    driverId: string;
    assignedFrom: string;
    assignedTo?: string | null;
    isActive: boolean;
    createdAt?: string;
  }) {
    this.#id = props.id;
    this.#vehicleId = props.vehicleId;
    this.#driverId = props.driverId;
    this.#assignedFrom = props.assignedFrom;
    this.#assignedTo = props.assignedTo ?? null;
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
    const currentDate = date.toISOString().slice(0, 10);

    return (
      this.#isActive &&
      this.#assignedFrom <= currentDate &&
      (this.#assignedTo === null || currentDate <= this.#assignedTo)
    );
  }

  close(endDate: string): void {
    this.#assignedTo = endDate;
    this.#isActive = false;
  }
}
