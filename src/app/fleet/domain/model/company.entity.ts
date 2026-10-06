import { BaseEntity } from '../../../shared/domain/model/base-entity';

export interface CompanyProps {
  id: string;
  name: string;
  taxId: string;
  address: string;
  phone: string;
  email: string;
  fleetIds?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export class Company implements BaseEntity<string> {
  #id: string;
  #name: string;
  #taxId: string;
  #address: string;
  #phone: string;
  #email: string;
  #fleetIds: Set<string>;
  #createdAt?: string;
  #updatedAt?: string;

  constructor(props: CompanyProps) {
    this.#id = props.id;
    this.#name = props.name;
    this.#taxId = props.taxId;
    this.#address = props.address;
    this.#phone = props.phone;
    this.#email = props.email;
    this.#fleetIds = new Set(props.fleetIds ?? []);
    this.#createdAt = props.createdAt;
    this.#updatedAt = props.updatedAt;
  }

  get id(): string {
    return this.#id;
  }

  get name(): string {
    return this.#name;
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
    this.#fleetIds.add(fleetId);
  }

  getFleets(): string[] {
    return [...this.#fleetIds];
  }
}
