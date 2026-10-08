/**
 * Resource payload sent to resolve an incident.
 */
export interface ResolveIncidentRequest {
  incidentId: string;
  resolutionType: string;
  resolvedAt: string;
}
