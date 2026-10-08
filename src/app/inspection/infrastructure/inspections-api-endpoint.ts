import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Inspection } from '../domain/model/inspection.entity';
import { InspectionAssembler } from './inspection-assembler';
import { InspectionResource, InspectionsResponse } from './inspections-response';

const inspectionsApiEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderInspectionsEndpointPath}`;

export class InspectionsApiEndpoint extends BaseApiEndpoint<
  Inspection,
  InspectionResource,
  InspectionsResponse,
  InspectionAssembler
> {
  constructor(http: HttpClient) {
    super(http, inspectionsApiEndpointUrl, new InspectionAssembler());
  }
}
