import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface VehicleAssignmentResource extends BaseResource {
  vehicleId: string;
  driverId: string;
  assignedFrom: string;
  assignedTo: string | null;
  isActive: boolean;
  createdAt?: string;
}

export interface VehicleAssignmentsResponse extends BaseResponse {
  vehicleAssignments: VehicleAssignmentResource[];
}
