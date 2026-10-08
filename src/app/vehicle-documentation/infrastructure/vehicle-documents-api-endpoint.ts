import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { VehicleDocument } from '../domain/model/vehicle-document.entity';
import { VehicleDocumentAssembler } from './vehicle-document-assembler';
import { VehicleDocumentResource, VehicleDocumentsResponse } from './vehicle-documents-response';

const vehicleDocumentsApiEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderVehicleDocumentsEndpointPath}`;

export class VehicleDocumentsApiEndpoint extends BaseApiEndpoint<
  VehicleDocument,
  VehicleDocumentResource,
  VehicleDocumentsResponse,
  VehicleDocumentAssembler
> {
  constructor(http: HttpClient) {
    super(http, vehicleDocumentsApiEndpointUrl, new VehicleDocumentAssembler());
  }
}
