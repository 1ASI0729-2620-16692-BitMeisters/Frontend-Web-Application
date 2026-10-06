import { BaseEntity } from '../../../../shared/domain/model/base-entity';
import { ItemCategory } from '../valueobjects/item-category.enum';
import { ResultValue } from '../valueobjects/result-value.enum';

export class InspectionItem implements BaseEntity {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly description: string;
  readonly category: ItemCategory;
  readonly isSafetyComponent: boolean;
  readonly requiresEvidence: boolean;
  readonly displayOrder: number;
  readonly isActive: boolean;

  constructor(props: {
    id: string;
    code: string;
    name: string;
    description: string;
    category: ItemCategory;
    isSafetyComponent: boolean;
    requiresEvidence: boolean;
    displayOrder: number;
    isActive: boolean;
  }) {
    this.id = props.id;
    this.code = props.code;
    this.name = props.name;
    this.description = props.description;
    this.category = props.category;
    this.isSafetyComponent = props.isSafetyComponent;
    this.requiresEvidence = props.requiresEvidence;
    this.displayOrder = props.displayOrder;
    this.isActive = props.isActive;
  }

  demandsEvidenceFor(result: ResultValue): boolean {
    return this.requiresEvidence && result !== ResultValue.OK;
  }
}
