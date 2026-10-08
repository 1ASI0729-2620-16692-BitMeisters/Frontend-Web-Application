import { BaseResponse } from '../../shared/infrastructure/base-response';

export interface VehicleSummaryResource {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  type: string;
  currentStatus: string;
}

export interface VehicleAssignmentResponse extends BaseResponse {
  id: string;
  driverId: string;
  assignedFrom: string;
  assignedTo: string | null;
  isActive: boolean;
  createdAt: string;
  vehicle: VehicleSummaryResource;
}
