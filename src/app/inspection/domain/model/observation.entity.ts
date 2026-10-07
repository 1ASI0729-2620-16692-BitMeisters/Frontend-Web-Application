import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { Evidence } from './evidence.entity';

export class Observation extends BaseEntity {
  #notes: string;
  #evidence?: Evidence;

  constructor(props: {
    id: string;
    notes: string;
    evidence?: Evidence;
  }) {
    super(props.id);
    this.#notes = props.notes;
    this.#evidence = props.evidence;
  }

  get notes(): string {
    return this.#notes;
  }

  get evidence(): Evidence | undefined {
    return this.#evidence;
  }
}
