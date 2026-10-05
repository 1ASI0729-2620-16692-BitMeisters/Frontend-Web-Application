import { BaseEntity } from '../../../shared/domain/model/base-entity';

/**
 * Represents a classification catalog entry for incidents.
 */
export class IncidentType implements BaseEntity {
  #id: number;
  #code: string;
  #name: string;
  #description: string;
  #isActive: boolean;

  constructor(props: {
    id: number;
    code: string;
    name: string;
    description: string;
    isActive: boolean;
  }) {
    this.#id = props.id;
    this.#code = props.code;
    this.#name = props.name;
    this.#description = props.description;
    this.#isActive = props.isActive;
  }

  get id(): number {
    return this.#id;
  }
  set id(value: number) {
    this.#id = value;
  }

  get code(): string {
    return this.#code;
  }
  set code(value: string) {
    this.#code = value;
  }

  get name(): string {
    return this.#name;
  }
  set name(value: string) {
    this.#name = value;
  }

  get description(): string {
    return this.#description;
  }
  set description(value: string) {
    this.#description = value;
  }

  get isActive(): boolean {
    return this.#isActive;
  }
  set isActive(value: boolean) {
    this.#isActive = value;
  }
}
