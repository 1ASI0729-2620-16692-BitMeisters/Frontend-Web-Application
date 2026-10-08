/**
 * Resource payload sent to register a corrective action.
 */
export interface RegisterCorrectiveActionRequest {
  incidentId: string;
  description: string;
  performedBy: string;
  performedAt: string;
  evidenceUrl: string;
}
