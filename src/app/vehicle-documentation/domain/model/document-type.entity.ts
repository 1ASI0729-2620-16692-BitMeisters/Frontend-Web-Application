import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class DocumentType implements BaseEntity {
  #id: string;
  #code: string;
  #name: string;
  #description: string;
  #isRequired: boolean;
  #isActive: boolean;

  constructor(props: {
    id: string;
    code: string;
    name: string;
    description: string;
    isRequired: boolean;
    isActive: boolean;
  }) {
    this.#id = props.id;
    this.#code = props.code;
    this.#name = props.name;
    this.#description = props.description;
    this.#isRequired = props.isRequired;
    this.#isActive = props.isActive;
  }

  get id(): string {
    return this.#id;
  }

  set id(value: string) {
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

  get isRequired(): boolean {
    return this.#isRequired;
  }

  set isRequired(value: boolean) {
    this.#isRequired = value;
  }

  get isActive(): boolean {
    return this.#isActive;
  }

  set isActive(value: boolean) {
    this.#isActive = value;
  }
}
