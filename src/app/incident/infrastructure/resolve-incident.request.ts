/**
 * Resource payload sent to resolve an incident.
 */
export interface ResolveIncidentRequest {
  incidentId: number;
  resolutionType: string;
  resolvedAt: string;
}
