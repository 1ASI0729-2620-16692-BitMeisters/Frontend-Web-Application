import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { environment } from '../../../environments/environment';
import { Inspection } from '../domain/model/inspection.entity';
import { InspectionResource, InspectionsResponse } from './inspections-response';
import { InspectionAssembler } from './inspection-assembler';

export class InspectionsApiEndpoint extends BaseApiEndpoint<
  Inspection,
  InspectionResource,
  InspectionsResponse,
  InspectionAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderInspectionsEndpointPath}`,
      new InspectionAssembler(),
    );
  }

  getByVehicleId(vehicleId: string): Observable<Inspection[]> {
    const params = new HttpParams().set('vehicleId', vehicleId);
    return this.http
      .get<InspectionsResponse | InspectionResource[]>(this.endpointUrl, { params })
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response.map((r) => this.assembler.toEntityFromResource(r));
          }
          return this.assembler.toEntitiesFromResponse(response as InspectionsResponse);
        }),
      );
  }

  getByDriverId(driverId: string): Observable<Inspection[]> {
    const params = new HttpParams().set('driverId', driverId);
    return this.http
      .get<InspectionsResponse | InspectionResource[]>(this.endpointUrl, { params })
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response.map((r) => this.assembler.toEntityFromResource(r));
          }
          return this.assembler.toEntitiesFromResponse(response as InspectionsResponse);
        }),
      );
  }
}
