import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { InspectionItem } from '../domain/model/inspection-item.entity';
import { ItemCategory } from '../domain/model/item-category.enum';
import { ItemSystem } from '../domain/model/item-system.enum';
import { InspectionItemResource, InspectionItemsResponse } from './inspection-items-response';

export class InspectionItemAssembler implements BaseAssembler<
  InspectionItem,
  InspectionItemResource,
  InspectionItemsResponse
> {
  toEntitiesFromResponse = (response: InspectionItemsResponse): InspectionItem[] =>
    response.inspectionItems.map((resource) => this.toEntityFromResource(resource));

  toEntityFromResource = (resource: InspectionItemResource): InspectionItem =>
    new InspectionItem({
      id: resource.id,
      code: resource.code,
      name: resource.name,
      description: resource.description ?? '',
      category: resource.category as ItemCategory,
      system: resource.system as ItemSystem,
      isSafetyComponent: resource.isSafetyComponent,
      requiresEvidence: resource.requiresEvidence,
      displayOrder: resource.displayOrder,
      isActive: resource.isActive,
      createdAt: new Date(resource.createdAt),
      updatedAt: new Date(resource.updatedAt),
    });

  toResourceFromEntity = (entity: InspectionItem): InspectionItemResource => ({
    id: entity.id,
    code: entity.code,
    name: entity.name,
    description: entity.description,
    category: entity.category,
    system: entity.system,
    isSafetyComponent: entity.isSafetyComponent,
    requiresEvidence: entity.requiresEvidence,
    displayOrder: entity.displayOrder,
    isActive: entity.isActive,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
  });
}
