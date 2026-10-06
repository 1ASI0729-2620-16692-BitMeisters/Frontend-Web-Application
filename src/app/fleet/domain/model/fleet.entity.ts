import { BaseEntity } from '../../../shared/domain/model/base-entity';
import type { Vehicle } from './vehicle.entity';
import { VehicleStatus } from './vehicle.entity';

export interface FleetProps {
  id: string;
  companyId: string;
  name: string;
  description: string;
  vehicleIds?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export class Fleet implements BaseEntity<string> {
  #id: string;
  #companyId: string;
  #name: string;
  #description: string;
  #vehicleIds: Set<string>;
  #createdAt?: string;
  #updatedAt?: string;

  constructor(props: FleetProps) {
    this.#id = props.id;
    this.#companyId = props.companyId;
    this.#name = props.name;
    this.#description = props.description;
    this.#vehicleIds = new Set(props.vehicleIds ?? []);
    this.#createdAt = props.createdAt;
    this.#updatedAt = props.updatedAt;
  }

  get id(): string {
    return this.#id;
  }

  get companyId(): string {
    return this.#companyId;
  }

  get name(): string {
    return this.#name;
  }

  get description(): string {
    return this.#description;
  }

  get createdAt(): string | undefined {
    return this.#createdAt;
  }

  get updatedAt(): string | undefined {
    return this.#updatedAt;
  }

  addVehicle(vehicleId: string): void {
    this.#vehicleIds.add(vehicleId);
  }

  getVehicles(): string[] {
    return [...this.#vehicleIds];
  }

  countByStatus(vehicles: readonly Vehicle[]): Record<VehicleStatus, number> {
    return {
      [VehicleStatus.ENABLED]: vehicles.filter(
        (vehicle) => vehicle.currentStatus === VehicleStatus.ENABLED,
      ).length,
      [VehicleStatus.OBSERVED]: vehicles.filter(
        (vehicle) => vehicle.currentStatus === VehicleStatus.OBSERVED,
      ).length,
      [VehicleStatus.NOT_ENABLED]: vehicles.filter(
        (vehicle) => vehicle.currentStatus === VehicleStatus.NOT_ENABLED,
      ).length,
    };
  }
}
