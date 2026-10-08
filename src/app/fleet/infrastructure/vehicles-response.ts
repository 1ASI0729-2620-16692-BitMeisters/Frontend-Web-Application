import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { VehicleStatus, VehicleType } from '../domain/model/vehicle.entity';

export interface VehicleResource extends BaseResource {
  fleetId: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  type: VehicleType;
  capacity: number;
  currentStatus: VehicleStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface VehiclesResponse extends BaseResponse {
  vehicles: VehicleResource[];
}
