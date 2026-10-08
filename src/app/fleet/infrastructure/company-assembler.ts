import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Company } from '../domain/model/company.entity';
import { CompanyResource, CompaniesResponse } from './companies-response';

export class CompanyAssembler implements BaseAssembler<
  Company,
  CompanyResource,
  CompaniesResponse
> {
  toEntityFromResource(resource: CompanyResource): Company {
    return new Company(resource);
  }

  toResourceFromEntity(entity: Company): CompanyResource {
    return {
      id: entity.id,
      name: entity.name,
      taxId: entity.taxId,
      address: entity.address,
      phone: entity.phone,
      email: entity.email,
      fleetIds: entity.getFleets(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toEntitiesFromResponse(response: CompaniesResponse): Company[] {
    return response.companies.map((resource) => this.toEntityFromResource(resource));
  }
}
