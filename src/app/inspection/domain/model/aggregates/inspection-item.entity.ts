import { AuditableAggregateRoot } from '../../../../shared/domain/model/auditable-aggregate-root';
import { ItemCategory } from '../valueobjects/item-category.enum';
import { ItemSystem } from '../valueobjects/item-system.enum';

export interface InspectionItemProps {
  id: string;
  code: string;
  name: string;
  description: string;
  category: ItemCategory;
  system: ItemSystem;
  isSafetyComponent: boolean;
  requiresEvidence: boolean;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class InspectionItem extends AuditableAggregateRoot {
  readonly code: string;
  readonly name: string;
  readonly description: string;
  readonly category: ItemCategory;
  readonly system: ItemSystem;
  readonly isSafetyComponent: boolean;
  readonly requiresEvidence: boolean;
  readonly displayOrder: number;
  readonly isActive: boolean;

  constructor(props: InspectionItemProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this.code = props.code;
    this.name = props.name;
    this.description = props.description;
    this.category = props.category;
    this.system = props.system;
    this.isSafetyComponent = props.isSafetyComponent;
    this.requiresEvidence = props.requiresEvidence;
    this.displayOrder = props.displayOrder;
    this.isActive = props.isActive;
  }
}
