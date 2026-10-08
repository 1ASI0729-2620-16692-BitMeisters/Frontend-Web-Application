import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface DocumentTypeResource extends BaseResource {
  id: string;
  code: string;
  name: string;
  description: string;
  isRequired: boolean;
  isActive: boolean;
}

export interface DocumentTypesResponse extends BaseResponse {
  documentTypes: DocumentTypeResource[];
}
