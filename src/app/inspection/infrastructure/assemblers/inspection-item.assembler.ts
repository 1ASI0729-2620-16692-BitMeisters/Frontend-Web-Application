import { InspectionItem } from '../../domain/model/aggregates/inspection-item.entity';
import { ItemCategory } from '../../domain/model/valueobjects/item-category.enum';
import { InspectionItemResource } from '../resources/inspection-item.resource';

export class InspectionItemAssembler {
  static toEntity(resource: InspectionItemResource): InspectionItem {
    return new InspectionItem({
      id: resource.id,
      code: resource.code,
      name: resource.name,
      description: resource.description ?? '',
      category: resource.category as ItemCategory,
      isSafetyComponent: resource.isSafetyComponent,
      requiresEvidence: resource.requiresEvidence,
      displayOrder: resource.displayOrder,
      isActive: resource.isActive,
      createdAt: new Date(resource.createdAt),
      updatedAt: new Date(resource.updatedAt),
    });
  }

  static toEntities(resources: InspectionItemResource[]): InspectionItem[] {
    return resources.map(InspectionItemAssembler.toEntity);
  }
}
