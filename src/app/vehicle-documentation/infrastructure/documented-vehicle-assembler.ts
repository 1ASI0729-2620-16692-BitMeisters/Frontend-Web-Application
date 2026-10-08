import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { DocumentedVehicle } from '../domain/model/documented-vehicle.entity';
import {
  DocumentedVehicleResource,
  DocumentedVehiclesResponse,
} from './documented-vehicles-response';

export class DocumentedVehicleAssembler implements BaseAssembler<
  DocumentedVehicle,
  DocumentedVehicleResource,
  DocumentedVehiclesResponse
> {
  toEntitiesFromResponse = (response: DocumentedVehiclesResponse): DocumentedVehicle[] =>
    response.vehicles.map((resource) => this.toEntityFromResource(resource));

  toEntityFromResource = (resource: DocumentedVehicleResource): DocumentedVehicle =>
    new DocumentedVehicle({ id: resource.id, plate: resource.plate });

  toResourceFromEntity = (entity: DocumentedVehicle): DocumentedVehicleResource => ({
    id: entity.id,
    plate: entity.plate,
  });
}
