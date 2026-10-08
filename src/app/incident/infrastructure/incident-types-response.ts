import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Resource representation of an incident type.
 */
export interface IncidentTypeResource extends BaseResource {
  id: number;
  code: string;
  name: string;
  description: string;
  isActive: boolean;
}

/**
 * Response envelope for incident type collection queries.
 */
export interface IncidentTypesResponse extends BaseResponse {
  incidentTypes: IncidentTypeResource[];
}
