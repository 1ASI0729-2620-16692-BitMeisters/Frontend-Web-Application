/**
 * Resource payload sent to add an incident follow-up.
 */
export interface AddIncidentFollowUpRequest {
  incidentId: number;
  note: string;
  createdBy: string;
  createdAt: string;
}
