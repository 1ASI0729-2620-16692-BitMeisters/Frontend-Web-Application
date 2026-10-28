import { BaseResource } from '../../shared/infrastructure/base-response';

/**
 * Resource describing a user returned by IAM endpoints.
 */
export interface UserResource extends BaseResource {
  id: string;
  companyId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
