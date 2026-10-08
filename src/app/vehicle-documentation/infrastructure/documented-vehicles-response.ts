import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface DocumentedVehicleResource extends BaseResource {
  id: string;
  plate: string;
}

export interface DocumentedVehiclesResponse extends BaseResponse {
  vehicles: DocumentedVehicleResource[];
}
