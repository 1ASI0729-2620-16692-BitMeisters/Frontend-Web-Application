import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Vehicle } from '../domain/model/vehicle.entity';
import { VehicleResource, VehiclesResponse } from './vehicles-response';

export class VehicleAssembler implements BaseAssembler<Vehicle, VehicleResource, VehiclesResponse> {
  toEntityFromResource(resource: VehicleResource): Vehicle {
    return new Vehicle(resource);
  }

  toResourceFromEntity(entity: Vehicle): VehicleResource {
    return {
      id: entity.id,
      fleetId: entity.fleetId,
      plate: entity.plate,
      brand: entity.brand,
      model: entity.model,
      year: entity.year,
      type: entity.type,
      capacity: entity.capacity,
      currentStatus: entity.currentStatus,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toEntitiesFromResponse(response: VehiclesResponse): Vehicle[] {
    return response.vehicles.map((resource) => this.toEntityFromResource(resource));
  }
}
