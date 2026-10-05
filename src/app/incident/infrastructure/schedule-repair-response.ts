import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Resource returned by the schedule repair endpoint.
 */
export interface ScheduleRepairResource extends BaseResource {
  id: number;
  incidentId: number;
  workshop: string;
  cost: number;
  startedAt: string;
  finishedAt: string;
  status: string;
}

/**
 * Response shape returned by the schedule repair endpoint.
 */
export interface ScheduleRepairResponse extends BaseResponse, ScheduleRepairResource {}
