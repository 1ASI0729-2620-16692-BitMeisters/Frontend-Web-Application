import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Fleet } from '../domain/model/fleet.entity';
import { FleetResource, FleetsResponse } from './fleets-response';

export class FleetAssembler implements BaseAssembler<Fleet, FleetResource, FleetsResponse> {
  toEntityFromResource(resource: FleetResource): Fleet {
    return new Fleet(resource);
  }

  toResourceFromEntity(entity: Fleet): FleetResource {
    return {
      id: entity.id,
      companyId: entity.companyId,
      name: entity.name,
      description: entity.description,
      vehicleIds: entity.getVehicles(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toEntitiesFromResponse(response: FleetsResponse): Fleet[] {
    return response.fleets.map((resource) => this.toEntityFromResource(resource));
  }
}
