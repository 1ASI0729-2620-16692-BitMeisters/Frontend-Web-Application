import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Resource returned by the complete repair endpoint.
 */
export interface CompleteRepairResource extends BaseResource {
  id: number;
  incidentId: number;
  workshop: string;
  cost: number;
  startedAt: string;
  finishedAt: string;
  status: string;
}

/**
 * Response shape returned by the complete repair endpoint.
 */
export interface CompleteRepairResponse extends BaseResponse, CompleteRepairResource {}
