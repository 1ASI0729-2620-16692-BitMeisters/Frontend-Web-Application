import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { ItemCategory, ResultValue } from './inspection.types';
import { Observation } from './observation.entity';

export class InspectionResultEntry extends BaseEntity {
  #itemId: string;
  #itemName: string;
  #itemCategory: ItemCategory;
  #isCriticalSafety: boolean;
  #result: ResultValue;
  #observation?: Observation;

  constructor(props: {
    id: string;
    itemId: string;
    itemName: string;
    itemCategory: ItemCategory;
    isCriticalSafety: boolean;
    result: ResultValue;
    observation?: Observation;
  }) {
    super(props.id);
    this.#itemId = props.itemId;
    this.#itemName = props.itemName;
    this.#itemCategory = props.itemCategory;
    this.#isCriticalSafety = props.isCriticalSafety;
    this.#result = props.result;
    this.#observation = props.observation;
  }

  get itemId(): string {
    return this.#itemId;
  }

  get itemName(): string {
    return this.#itemName;
  }

  get itemCategory(): ItemCategory {
    return this.#itemCategory;
  }

  get isCriticalSafety(): boolean {
    return this.#isCriticalSafety;
  }

  get result(): ResultValue {
    return this.#result;
  }

  get observation(): Observation | undefined {
    return this.#observation;
  }

  setResult(result: ResultValue): void {
    this.#result = result;
  }

  setObservation(observation: Observation | undefined): void {
    this.#observation = observation;
  }

  isNonCompliant(): boolean {
    return this.#result === 'FAIL' || this.#result === 'OBSERVED';
  }

  isCriticalFailure(): boolean {
    return this.#isCriticalSafety && this.#result === 'FAIL';
  }
}
