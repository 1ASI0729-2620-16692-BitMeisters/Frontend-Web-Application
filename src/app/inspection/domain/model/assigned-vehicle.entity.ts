import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class AssignedVehicle implements BaseEntity {
  #id: string;
  #vehicleId: string;
  #driverId: string;
  #plate: string;
  #brand: string;
  #model: string;
  #type: string;
  #assignedFrom: Date;

  constructor(props: {
    id: string;
    vehicleId: string;
    driverId: string;
    plate: string;
    brand: string;
    model: string;
    type: string;
    assignedFrom: Date;
  }) {
    this.#id = props.id;
    this.#vehicleId = props.vehicleId;
    this.#driverId = props.driverId;
    this.#plate = props.plate;
    this.#brand = props.brand;
    this.#model = props.model;
    this.#type = props.type;
    this.#assignedFrom = props.assignedFrom;
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

  get plate(): string {
    return this.#plate;
  }

  set plate(value: string) {
    this.#plate = value;
  }

  get brand(): string {
    return this.#brand;
  }

  set brand(value: string) {
    this.#brand = value;
  }

  get model(): string {
    return this.#model;
  }

  set model(value: string) {
    this.#model = value;
  }

  get type(): string {
    return this.#type;
  }

  set type(value: string) {
    this.#type = value;
  }

  get assignedFrom(): Date {
    return this.#assignedFrom;
  }

  set assignedFrom(value: Date) {
    this.#assignedFrom = value;
  }
}
