import { BaseEntity } from '../../../../shared/domain/model/base-entity';
import { Evidence } from './evidence.entity';

export class Observation implements BaseEntity {
  readonly id: string;
  readonly description: string;
  readonly createdBy: string;
  readonly createdAt: Date;
  readonly evidences: readonly Evidence[];

  constructor(props: {
    id: string;
    description: string;
    createdBy: string;
    createdAt: Date;
    evidences: readonly Evidence[];
  }) {
    this.id = props.id;
    this.description = props.description;
    this.createdBy = props.createdBy;
    this.createdAt = props.createdAt;
    this.evidences = props.evidences;
  }

  hasEvidence(): boolean {
    return this.evidences.length > 0;
  }
}
