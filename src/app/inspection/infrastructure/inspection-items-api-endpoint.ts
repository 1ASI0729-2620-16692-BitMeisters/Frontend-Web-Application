import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { environment } from '../../../environments/environment';
import { InspectionItem } from '../domain/model/inspection-item.entity';
import { InspectionItemResource, InspectionItemsResponse } from './inspection-items-response';
import { InspectionItemAssembler } from './inspection-item-assembler';

export class InspectionItemsApiEndpoint extends BaseApiEndpoint<
  InspectionItem,
  InspectionItemResource,
  InspectionItemsResponse,
  InspectionItemAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderInspectionItemsEndpointPath}`,
      new InspectionItemAssembler(),
    );
  }
}
