import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Resource returned by the resolve incident endpoint.
 */
export interface ResolveIncidentResource extends BaseResource {
  id: number;
  vehicleId: string;
  incidentTypeId: number;
  inspectionId: string | null;
  origin: string;
  description: string;
  severity: string;
  status: string;
  reportedBy: string;
  reportedAt: string;
  resolutionType: string;
  resolvedAt: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Response shape returned by the resolve incident endpoint.
 */
export interface ResolveIncidentResponse extends BaseResponse, ResolveIncidentResource {}
