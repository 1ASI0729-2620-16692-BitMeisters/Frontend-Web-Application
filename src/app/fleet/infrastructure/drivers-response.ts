import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface DriverResource extends BaseResource<string> {
  userId: string;
  licenseNumber: string;
  licenseExpirationDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DriversResponse extends BaseResponse {
  drivers: DriverResource[];
}
