import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class Company implements BaseEntity {
  #id: string;
  #name: string;
  #taxId: string;
  #address: string;
  #phone: string;
  #email: string;
  #fleetIds: string[];
  #createdAt?: string;
  #updatedAt?: string;

  constructor(props: {
    id: string;
    name: string;
    taxId: string;
    address: string;
    phone: string;
    email: string;
    fleetIds?: string[];
    createdAt?: string;
    updatedAt?: string;
  }) {
    this.#id = props.id;
    this.#name = props.name;
    this.#taxId = props.taxId;
    this.#address = props.address;
    this.#phone = props.phone;
    this.#email = props.email;
    this.#fleetIds = props.fleetIds ?? [];
    this.#createdAt = props.createdAt;
    this.#updatedAt = props.updatedAt;
  }

  get id(): string {
    return this.#id;
  }

  set id(value: string) {
    this.#id = value;
  }

  get name(): string {
    return this.#name;
  }

  set name(value: string) {
    this.#name = value;
  }

  get taxId(): string {
    return this.#taxId;
  }

  get address(): string {
    return this.#address;
  }

  get phone(): string {
    return this.#phone;
  }

  get email(): string {
    return this.#email;
  }

  get createdAt(): string | undefined {
    return this.#createdAt;
  }

  get updatedAt(): string | undefined {
    return this.#updatedAt;
  }

  addFleet(fleetId: string): void {
    if (!this.#fleetIds.includes(fleetId)) {
      this.#fleetIds.push(fleetId);
    }
  }

  getFleets(): string[] {
    return [...this.#fleetIds];
  }
}
