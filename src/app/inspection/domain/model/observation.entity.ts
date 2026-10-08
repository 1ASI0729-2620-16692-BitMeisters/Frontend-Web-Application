import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { Evidence } from './evidence.entity';

export class Observation implements BaseEntity {
  #id: string;
  #description: string;
  #createdBy: string;
  #createdAt: Date;
  #evidences: Evidence[];

  constructor(props: {
    id: string;
    description: string;
    createdBy: string;
    createdAt: Date;
    evidences: Evidence[];
  }) {
    this.#id = props.id;
    this.#description = props.description;
    this.#createdBy = props.createdBy;
    this.#createdAt = props.createdAt;
    this.#evidences = props.evidences;
  }

  get id(): string {
    return this.#id;
  }

  set id(value: string) {
    this.#id = value;
  }

  get description(): string {
    return this.#description;
  }

  set description(value: string) {
    this.#description = value;
  }

  get createdBy(): string {
    return this.#createdBy;
  }

  set createdBy(value: string) {
    this.#createdBy = value;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }

  set createdAt(value: Date) {
    this.#createdAt = value;
  }

  get evidences(): Evidence[] {
    return this.#evidences;
  }

  set evidences(value: Evidence[]) {
    this.#evidences = value;
  }
}
