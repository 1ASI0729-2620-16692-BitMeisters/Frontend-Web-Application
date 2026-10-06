import { BaseEntity } from '../../../shared/domain/model/base-entity';
import type { VehicleAssignment } from './vehicle-assignment.entity';

export class Driver implements BaseEntity {
  #id: string;
  #userId: string;
  #licenseNumber: string;
  #licenseExpirationDate: string;
  #createdAt?: string;
  #updatedAt?: string;

  constructor(props: {
    id: string;
    userId: string;
    licenseNumber: string;
    licenseExpirationDate: string;
    createdAt?: string;
    updatedAt?: string;
  }) {
    this.#id = props.id;
    this.#userId = props.userId;
    this.#licenseNumber = props.licenseNumber;
    this.#licenseExpirationDate = props.licenseExpirationDate;
    this.#createdAt = props.createdAt;
    this.#updatedAt = props.updatedAt;
  }

  get id(): string {
    return this.#id;
  }

  get userId(): string {
    return this.#userId;
  }

  get licenseNumber(): string {
    return this.#licenseNumber;
  }

  get licenseExpirationDate(): string {
    return this.#licenseExpirationDate;
  }

  get createdAt(): string | undefined {
    return this.#createdAt;
  }

  get updatedAt(): string | undefined {
    return this.#updatedAt;
  }

  hasValidLicense(referenceDate: string = new Date().toISOString().slice(0, 10)): boolean {
    return this.#licenseExpirationDate >= referenceDate;
  }

  getActiveAssignment(assignments: readonly VehicleAssignment[]): VehicleAssignment | null {
    return (
      assignments.find(
        (assignment) => assignment.driverId === this.#id && assignment.isActiveOn(new Date()),
      ) ?? null
    );
  }
}
