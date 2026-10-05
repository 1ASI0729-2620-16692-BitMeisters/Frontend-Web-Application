/**
 * Resource payload sent to schedule a repair.
 */
export interface ScheduleRepairRequest {
  incidentId: number;
  workshop: string;
  cost: number;
  startedAt: string;
  finishedAt: string;
}
