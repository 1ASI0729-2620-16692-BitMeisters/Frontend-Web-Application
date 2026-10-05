import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Incident } from '../domain/model/incident.entity';
import { IncidentResource, IncidentsResponse } from './incidents-response';
import { IncidentAssembler } from './incident-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const incidentsApiEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderIncidentsEndpointPath}`;

/**
 * Endpoint client for incident CRUD operations.
 */
export class IncidentsApiEndpoint extends BaseApiEndpoint<
  Incident,
  IncidentResource,
  IncidentsResponse,
  IncidentAssembler
> {
  /**
   * Creates an instance of IncidentsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, incidentsApiEndpointUrl, new IncidentAssembler());
  }
}
