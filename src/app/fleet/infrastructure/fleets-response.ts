import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface FleetResource extends BaseResource {
  companyId: string;
  name: string;
  description: string;
  vehicleIds?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface FleetsResponse extends BaseResponse {
  fleets: FleetResource[];
}
