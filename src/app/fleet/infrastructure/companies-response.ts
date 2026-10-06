import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface CompanyResource extends BaseResource<string> {
  name: string;
  taxId: string;
  address: string;
  phone: string;
  email: string;
  fleetIds?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CompaniesResponse extends BaseResponse {
  companies: CompanyResource[];
}
