import { BaseEntity } from '../../../../shared/domain/model/base-entity';
import { ItemCategory } from '../valueobjects/item-category.enum';
import { Observation } from './observation.entity';
import { ResultValue } from '../valueobjects/result-value.enum';

export interface InspectionResultEntryProps {
  id: string;
  inspectionItemId: string;
  itemName: string;
  itemCategory: ItemCategory;
  result: ResultValue;
  createdAt: Date;
  observations: readonly Observation[];
}

export class InspectionResultEntry extends BaseEntity {
  readonly inspectionItemId: string;
  readonly itemName: string;
  readonly itemCategory: ItemCategory;
  readonly result: ResultValue;
  readonly createdAt: Date;
  readonly observations: readonly Observation[];

  constructor(props: InspectionResultEntryProps) {
    super(props.id);
    this.inspectionItemId = props.inspectionItemId;
    this.itemName = props.itemName;
    this.itemCategory = props.itemCategory;
    this.result = props.result;
    this.createdAt = props.createdAt;
    this.observations = props.observations;
  }
}
