import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Driver } from '../domain/model/driver.entity';
import { DriverResource, DriversResponse } from './drivers-response';

export class DriverAssembler implements BaseAssembler<Driver, DriverResource, DriversResponse> {
  toEntityFromResource(resource: DriverResource): Driver {
    return new Driver(resource);
  }

  toResourceFromEntity(entity: Driver): DriverResource {
    return {
      id: entity.id,
      userId: entity.userId,
      licenseNumber: entity.licenseNumber,
      licenseExpirationDate: entity.licenseExpirationDate,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toEntitiesFromResponse(response: DriversResponse): Driver[] {
    return response.drivers.map((resource) => this.toEntityFromResource(resource));
  }
}
