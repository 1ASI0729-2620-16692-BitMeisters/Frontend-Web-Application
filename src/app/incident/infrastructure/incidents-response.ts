import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Resource representation of an incident.
 */
export interface IncidentResource extends BaseResource {
  id: string;
  vehicleId: string;
  incidentTypeId: string;
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
  correctiveActions: CorrectiveActionResource[];
  repairs: RepairResource[];
  followUps: IncidentFollowUpResource[];
}

/**
 * Resource representation of a corrective action.
 */
export interface CorrectiveActionResource extends BaseResource {
  id: string;
  incidentId: string;
  description: string;
  performedBy: string;
  performedAt: string;
  evidenceUrl: string;
}

/**
 * Resource representation of a repair.
 */
export interface RepairResource extends BaseResource {
  id: string;
  incidentId: string;
  workshop: string;
  cost: number;
  startedAt: string;
  finishedAt: string;
  status: string;
}

/**
 * Resource representation of an incident follow-up.
 */
export interface IncidentFollowUpResource extends BaseResource {
  id: string;
  incidentId: string;
  note: string;
  createdBy: string;
  createdAt: string;
}

/**
 * Response envelope for incident collection queries.
 */
export interface IncidentsResponse extends BaseResponse {
  incidents: IncidentResource[];
}
