import { BaseEntity } from '../../../../shared/domain/model/base-entity';
import { ItemCategory } from '../valueobjects/item-category.enum';
import { Observation } from './observation.entity';
import { ResultValue } from '../valueobjects/result-value.enum';

export class InspectionResultEntry implements BaseEntity {
  readonly id: string;
  readonly inspectionItemId: string;
  readonly itemName: string;
  readonly itemCategory: ItemCategory;
  readonly result: ResultValue;
  readonly createdAt: Date;
  readonly observations: readonly Observation[];

  constructor(props: {
    id: string;
    inspectionItemId: string;
    itemName: string;
    itemCategory: ItemCategory;
    result: ResultValue;
    createdAt: Date;
    observations: readonly Observation[];
  }) {
    this.id = props.id;
    this.inspectionItemId = props.inspectionItemId;
    this.itemName = props.itemName;
    this.itemCategory = props.itemCategory;
    this.result = props.result;
    this.createdAt = props.createdAt;
    this.observations = props.observations;
  }

  isFinding(): boolean {
    return this.result !== ResultValue.OK;
  }

  requiresObservation(): boolean {
    return this.isFinding();
  }

  hasObservation(): boolean {
    return this.observations.length > 0;
  }

  hasEvidence(): boolean {
    return this.observations.some((observation) => observation.hasEvidence());
  }
}
