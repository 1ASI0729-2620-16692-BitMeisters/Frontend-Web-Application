import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { environment } from '../../../environments/environment';
import { Company } from '../domain/model/company.entity';
import { CompanyResource, CompaniesResponse } from './companies-response';
import { CompanyAssembler } from './company-assembler';

export class CompaniesApiEndpoint extends BaseApiEndpoint<
  Company,
  CompanyResource,
  CompaniesResponse,
  CompanyAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderCompaniesEndpointPath}`,
      new CompanyAssembler(),
    );
  }
}
