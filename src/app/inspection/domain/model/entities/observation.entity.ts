import { BaseEntity } from '../../../../shared/domain/model/base-entity';
import { Evidence } from './evidence.entity';

export interface ObservationProps {
  id: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  evidences: readonly Evidence[];
}

export class Observation extends BaseEntity {
  readonly description: string;
  readonly createdBy: string;
  readonly createdAt: Date;
  readonly evidences: readonly Evidence[];

  constructor(props: ObservationProps) {
    super(props.id);
    this.description = props.description;
    this.createdBy = props.createdBy;
    this.createdAt = props.createdAt;
    this.evidences = props.evidences;
  }
}
