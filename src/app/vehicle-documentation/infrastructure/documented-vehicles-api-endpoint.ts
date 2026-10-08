import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { DocumentedVehicle } from '../domain/model/documented-vehicle.entity';
import { DocumentedVehicleAssembler } from './documented-vehicle-assembler';
import {
  DocumentedVehicleResource,
  DocumentedVehiclesResponse,
} from './documented-vehicles-response';

const documentedVehiclesApiEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderVehiclesEndpointPath}`;

export class DocumentedVehiclesApiEndpoint extends BaseApiEndpoint<
  DocumentedVehicle,
  DocumentedVehicleResource,
  DocumentedVehiclesResponse,
  DocumentedVehicleAssembler
> {
  constructor(http: HttpClient) {
    super(http, documentedVehiclesApiEndpointUrl, new DocumentedVehicleAssembler());
  }
}
