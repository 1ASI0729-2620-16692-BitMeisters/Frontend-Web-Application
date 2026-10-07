import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { ItemCategory } from '../domain/model/inspection.types';

export interface InspectionItemResource extends BaseResource {
  name: string;
  category: ItemCategory;
  orderIndex: number;
  isCriticalSafety: boolean;
  requiresPhotoOnFail: boolean;
  description?: string;
}

export interface InspectionItemsResponse extends BaseResponse {
  items: InspectionItemResource[];
}
