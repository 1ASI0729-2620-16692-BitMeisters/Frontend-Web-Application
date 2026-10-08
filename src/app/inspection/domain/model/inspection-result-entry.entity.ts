import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { ItemCategory } from './item-category.enum';
import { Observation } from './observation.entity';
import { ResultValue } from './result-value.enum';

export class InspectionResultEntry implements BaseEntity {
  #id: string;
  #inspectionItemId: string;
  #itemName: string;
  #itemCategory: ItemCategory;
  #result: ResultValue;
  #createdAt: Date;
  #observations: Observation[];

  constructor(props: {
    id: string;
    inspectionItemId: string;
    itemName: string;
    itemCategory: ItemCategory;
    result: ResultValue;
    createdAt: Date;
    observations: Observation[];
  }) {
    this.#id = props.id;
    this.#inspectionItemId = props.inspectionItemId;
    this.#itemName = props.itemName;
    this.#itemCategory = props.itemCategory;
    this.#result = props.result;
    this.#createdAt = props.createdAt;
    this.#observations = props.observations;
  }

  get id(): string {
    return this.#id;
  }

  set id(value: string) {
    this.#id = value;
  }

  get inspectionItemId(): string {
    return this.#inspectionItemId;
  }

  set inspectionItemId(value: string) {
    this.#inspectionItemId = value;
  }

  get itemName(): string {
    return this.#itemName;
  }

  set itemName(value: string) {
    this.#itemName = value;
  }

  get itemCategory(): ItemCategory {
    return this.#itemCategory;
  }

  set itemCategory(value: ItemCategory) {
    this.#itemCategory = value;
  }

  get result(): ResultValue {
    return this.#result;
  }

  set result(value: ResultValue) {
    this.#result = value;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }

  set createdAt(value: Date) {
    this.#createdAt = value;
  }

  get observations(): Observation[] {
    return this.#observations;
  }

  set observations(value: Observation[]) {
    this.#observations = value;
  }
}
