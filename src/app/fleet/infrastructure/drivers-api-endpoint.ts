import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { environment } from '../../../environments/environment';
import { Driver } from '../domain/model/driver.entity';
import { DriverResource, DriversResponse } from './drivers-response';
import { DriverAssembler } from './driver-assembler';

export class DriversApiEndpoint extends BaseApiEndpoint<
  string,
  Driver,
  DriverResource,
  DriversResponse,
  DriverAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderDriversEndpointPath}`,
      new DriverAssembler(),
    );
  }
}
