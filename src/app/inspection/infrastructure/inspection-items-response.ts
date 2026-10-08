import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface InspectionItemResource extends BaseResource {
  id: string;
  code: string;
  name: string;
  description?: string;
  category: string;
  system: string;
  isSafetyComponent: boolean;
  requiresEvidence: boolean;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InspectionItemsResponse extends BaseResponse {
  inspectionItems: InspectionItemResource[];
}
