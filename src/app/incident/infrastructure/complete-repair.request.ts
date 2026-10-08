/**
 * Resource payload sent to complete a repair.
 */
export interface CompleteRepairRequest {
  incidentId: number;
  repairId: number;
  finishedAt: string;
}
