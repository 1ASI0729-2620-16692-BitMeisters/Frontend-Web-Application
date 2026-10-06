import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { VehicleStatus } from '../domain/model/vehicle.entity';

export interface VehicleResource extends BaseResource<string> {
  fleetId: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  trucktype: string;
  capacity: number;
  currentStatus: VehicleStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface VehiclesResponse extends BaseResponse {
  vehicles: VehicleResource[];
}
