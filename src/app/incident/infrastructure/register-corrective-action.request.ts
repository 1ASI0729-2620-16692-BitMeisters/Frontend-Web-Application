/**
 * Resource payload sent to register a corrective action.
 */
export interface RegisterCorrectiveActionRequest {
  incidentId: number;
  description: string;
  performedBy: string;
  performedAt: string;
  evidenceUrl: string;
}
