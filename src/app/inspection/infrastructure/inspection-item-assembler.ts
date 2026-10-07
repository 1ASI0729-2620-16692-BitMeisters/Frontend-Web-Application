import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { InspectionItem } from '../domain/model/inspection-item.entity';
import { InspectionItemResource, InspectionItemsResponse } from './inspection-items-response';

export class InspectionItemAssembler
  implements BaseAssembler<InspectionItem, InspectionItemResource, InspectionItemsResponse>
{
  toEntityFromResource(resource: InspectionItemResource): InspectionItem {
    return new InspectionItem({
      id: resource.id,
      name: resource.name,
      category: resource.category,
      orderIndex: resource.orderIndex,
      isCriticalSafety: resource.isCriticalSafety,
      requiresPhotoOnFail: resource.requiresPhotoOnFail,
      description: resource.description,
    });
  }

  toResourceFromEntity(entity: InspectionItem): InspectionItemResource {
    return {
      id: entity.id,
      name: entity.name,
      category: entity.category,
      orderIndex: entity.orderIndex,
      isCriticalSafety: entity.isCriticalSafety,
      requiresPhotoOnFail: entity.requiresPhotoOnFail,
      description: entity.description,
    };
  }

  toEntitiesFromResponse(response: InspectionItemsResponse): InspectionItem[] {
    return response.items.map((resource) => this.toEntityFromResource(resource));
  }
}
