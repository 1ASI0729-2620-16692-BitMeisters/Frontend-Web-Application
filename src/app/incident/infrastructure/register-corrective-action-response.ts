import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Resource returned by the register corrective action endpoint.
 */
export interface RegisterCorrectiveActionResource extends BaseResource {
  id: number;
  incidentId: number;
  description: string;
  performedBy: string;
  performedAt: string;
  evidenceUrl: string;
}

/**
 * Response shape returned by the register corrective action endpoint.
 */
export interface RegisterCorrectiveActionResponse
  extends BaseResponse, RegisterCorrectiveActionResource {}
