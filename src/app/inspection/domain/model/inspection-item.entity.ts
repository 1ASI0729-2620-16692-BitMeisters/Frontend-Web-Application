import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { ItemCategory } from './inspection.types';

export class InspectionItem extends BaseEntity {
  #name: string;
  #category: ItemCategory;
  #orderIndex: number;
  #isCriticalSafety: boolean;
  #requiresPhotoOnFail: boolean;
  #description?: string;

  constructor(props: {
    id: string;
    name: string;
    category: ItemCategory;
    orderIndex: number;
    isCriticalSafety: boolean;
    requiresPhotoOnFail: boolean;
    description?: string;
  }) {
    super(props.id);
    this.#name = props.name;
    this.#category = props.category;
    this.#orderIndex = props.orderIndex;
    this.#isCriticalSafety = props.isCriticalSafety;
    this.#requiresPhotoOnFail = props.requiresPhotoOnFail;
    this.#description = props.description;
  }

  get name(): string {
    return this.#name;
  }

  get category(): ItemCategory {
    return this.#category;
  }

  get orderIndex(): number {
    return this.#orderIndex;
  }

  get isCriticalSafety(): boolean {
    return this.#isCriticalSafety;
  }

  get requiresPhotoOnFail(): boolean {
    return this.#requiresPhotoOnFail;
  }

  get description(): string | undefined {
    return this.#description;
  }
}
