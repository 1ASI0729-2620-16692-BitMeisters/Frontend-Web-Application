import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { IncidentType } from '../domain/model/incident-type.entity';
import { IncidentTypeResource, IncidentTypesResponse } from './incident-types-response';

/**
 * Maps incident type entities to and from API resources.
 */
export class IncidentTypeAssembler implements BaseAssembler<
  IncidentType,
  IncidentTypeResource,
  IncidentTypesResponse
> {
  /**
   * Converts an IncidentTypesResponse to an array of IncidentType entities.
   * @param response - The API response containing incident types.
   * @returns An array of IncidentType entities.
   */
  toEntitiesFromResponse = (response: IncidentTypesResponse): IncidentType[] =>
    response.incidentTypes.map((resource) => this.toEntityFromResource(resource));

  /**
   * Converts an IncidentTypeResource to an IncidentType entity.
   * @param resource - The resource to convert.
   * @returns The converted IncidentType entity.
   */
  toEntityFromResource = (resource: IncidentTypeResource): IncidentType =>
    new IncidentType({
      id: resource.id,
      code: resource.code,
      name: resource.name,
      description: resource.description,
      isActive: resource.isActive,
    });

  /**
   * Converts an IncidentType entity to an IncidentTypeResource.
   * @param entity - The entity to convert.
   * @returns The converted IncidentTypeResource.
   */
  toResourceFromEntity = (entity: IncidentType): IncidentTypeResource =>
    ({
      id: entity.id,
      code: entity.code,
      name: entity.name,
      description: entity.description,
      isActive: entity.isActive,
    }) as IncidentTypeResource;
}
