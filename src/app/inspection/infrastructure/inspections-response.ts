import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import {
  InspectionStatus,
  ItemCategory,
  ResultValue,
  VehicleOperatingCondition,
} from '../domain/model/inspection.types';

export interface EvidenceResource {
  id: string;
  photoUrl: string;
  capturedAt: string;
}

export interface ObservationResource {
  id: string;
  notes: string;
  evidence?: EvidenceResource;
}

export interface InspectionResultResource {
  id: string;
  itemId: string;
  itemName: string;
  itemCategory: ItemCategory;
  isCriticalSafety: boolean;
  result: ResultValue;
  observation?: ObservationResource;
}

export interface InspectionResource extends BaseResource {
  vehicleId: string;
  driverId: string;
  vehiclePlate: string;
  driverName: string;
  status: InspectionStatus;
  odometer: number;
  startedAt: string;
  completedAt?: string;
  results: InspectionResultResource[];
  operatingCondition?: VehicleOperatingCondition;
  failureReason?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InspectionsResponse extends BaseResponse {
  inspections: InspectionResource[];
}
