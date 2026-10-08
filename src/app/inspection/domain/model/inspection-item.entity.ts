import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { ItemCategory } from './item-category.enum';
import { ItemSystem } from './item-system.enum';

export class InspectionItem implements BaseEntity {
  #id: string;
  #code: string;
  #name: string;
  #description: string;
  #category: ItemCategory;
  #system: ItemSystem;
  #isSafetyComponent: boolean;
  #requiresEvidence: boolean;
  #displayOrder: number;
  #isActive: boolean;
  #createdAt: Date;
  #updatedAt: Date;

  constructor(props: {
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
  }) {
    this.#id = props.id;
    this.#code = props.code;
    this.#name = props.name;
    this.#description = props.description;
    this.#category = props.category;
    this.#system = props.system;
    this.#isSafetyComponent = props.isSafetyComponent;
    this.#requiresEvidence = props.requiresEvidence;
    this.#displayOrder = props.displayOrder;
    this.#isActive = props.isActive;
    this.#createdAt = props.createdAt;
    this.#updatedAt = props.updatedAt;
  }

  get id(): string {
    return this.#id;
  }

  set id(value: string) {
    this.#id = value;
  }

  get code(): string {
    return this.#code;
  }

  set code(value: string) {
    this.#code = value;
  }

  get name(): string {
    return this.#name;
  }

  set name(value: string) {
    this.#name = value;
  }

  get description(): string {
    return this.#description;
  }

  set description(value: string) {
    this.#description = value;
  }

  get category(): ItemCategory {
    return this.#category;
  }

  set category(value: ItemCategory) {
    this.#category = value;
  }

  get system(): ItemSystem {
    return this.#system;
  }

  set system(value: ItemSystem) {
    this.#system = value;
  }

  get isSafetyComponent(): boolean {
    return this.#isSafetyComponent;
  }

  set isSafetyComponent(value: boolean) {
    this.#isSafetyComponent = value;
  }

  get requiresEvidence(): boolean {
    return this.#requiresEvidence;
  }

  set requiresEvidence(value: boolean) {
    this.#requiresEvidence = value;
  }

  get displayOrder(): number {
    return this.#displayOrder;
  }

  set displayOrder(value: number) {
    this.#displayOrder = value;
  }

  get isActive(): boolean {
    return this.#isActive;
  }

  set isActive(value: boolean) {
    this.#isActive = value;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }

  set createdAt(value: Date) {
    this.#createdAt = value;
  }

  get updatedAt(): Date {
    return this.#updatedAt;
  }

  set updatedAt(value: Date) {
    this.#updatedAt = value;
  }
}
