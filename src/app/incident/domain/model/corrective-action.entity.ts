import { BaseEntity } from '../../../shared/domain/model/base-entity';

/**
 * Represents an action applied to address an incident condition.
 */
export class CorrectiveAction implements BaseEntity {
  #id: number;
  #incidentId: number;
  #description: string;
  #performedBy: string;
  #performedAt: string;
  #evidenceUrl: string;

  constructor(props: {
    id: number;
    incidentId: number;
    description: string;
    performedBy: string;
    performedAt: string;
    evidenceUrl: string;
  }) {
    this.#id = props.id;
    this.#incidentId = props.incidentId;
    this.#description = props.description;
    this.#performedBy = props.performedBy;
    this.#performedAt = props.performedAt;
    this.#evidenceUrl = props.evidenceUrl;
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

  get description(): string {
    return this.#description;
  }
  set description(value: string) {
    this.#description = value;
  }

  get performedBy(): string {
    return this.#performedBy;
  }
  set performedBy(value: string) {
    this.#performedBy = value;
  }

  get performedAt(): string {
    return this.#performedAt;
  }
  set performedAt(value: string) {
    this.#performedAt = value;
  }

  get evidenceUrl(): string {
    return this.#evidenceUrl;
  }
  set evidenceUrl(value: string) {
    this.#evidenceUrl = value;
  }
}
