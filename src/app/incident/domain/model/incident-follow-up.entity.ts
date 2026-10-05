import { BaseEntity } from '../../../shared/domain/model/base-entity';

/**
 * Represents a supervisor follow-up note on an incident.
 */
export class IncidentFollowUp implements BaseEntity {
  #id: number;
  #incidentId: number;
  #note: string;
  #createdBy: string;
  #createdAt: string;

  constructor(props: {
    id: number;
    incidentId: number;
    note: string;
    createdBy: string;
    createdAt: string;
  }) {
    this.#id = props.id;
    this.#incidentId = props.incidentId;
    this.#note = props.note;
    this.#createdBy = props.createdBy;
    this.#createdAt = props.createdAt;
  }

  get id(): number {
    return this.#id;
  }
  set id(value: number) {
    this.#id = value;
  }

  get incidentId(): number {
    return this.#incidentId;
  }
  set incidentId(value: number) {
    this.#incidentId = value;
  }

  get note(): string {
    return this.#note;
  }
  set note(value: string) {
    this.#note = value;
  }

  get createdBy(): string {
    return this.#createdBy;
  }
  set createdBy(value: string) {
    this.#createdBy = value;
  }

  get createdAt(): string {
    return this.#createdAt;
  }
  set createdAt(value: string) {
    this.#createdAt = value;
  }
}
