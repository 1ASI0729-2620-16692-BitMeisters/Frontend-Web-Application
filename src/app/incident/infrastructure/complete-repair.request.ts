/**
 * Resource payload sent to complete a repair.
 */
export interface CompleteRepairRequest {
  incidentId: string;
  repairId: string;
  finishedAt: string;
}
