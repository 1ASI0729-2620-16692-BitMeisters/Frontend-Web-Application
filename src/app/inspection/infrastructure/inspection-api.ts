import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApi } from '../../shared/infrastructure/base-api';

import { InspectionItem } from '../domain/model/inspection-item.entity';
import { Inspection } from '../domain/model/inspection.entity';

import { InspectionItemsApiEndpoint } from './inspection-items-api-endpoint';
import { InspectionsApiEndpoint } from './inspections-api-endpoint';

@Injectable({
  providedIn: 'root',
})
export class InspectionApi extends BaseApi {
  private readonly http = inject(HttpClient);

  private readonly itemsEndpoint = new InspectionItemsApiEndpoint(this.http);
  private readonly inspectionsEndpoint = new InspectionsApiEndpoint(this.http);

  getInspectionItems(): Observable<InspectionItem[]> {
    return this.itemsEndpoint.getAll();
  }

  getInspections(): Observable<Inspection[]> {
    return this.inspectionsEndpoint.getAll();
  }

  getInspection(id: string): Observable<Inspection> {
    return this.inspectionsEndpoint.getById(id);
  }

  createInspection(inspection: Inspection): Observable<Inspection> {
    return this.inspectionsEndpoint.create(inspection);
  }

  updateInspection(inspection: Inspection): Observable<Inspection> {
    return this.inspectionsEndpoint.update(inspection, inspection.id);
  }

  getInspectionsByVehicle(vehicleId: string): Observable<Inspection[]> {
    return this.inspectionsEndpoint.getByVehicleId(vehicleId);
  }

  getInspectionsByDriver(driverId: string): Observable<Inspection[]> {
    return this.inspectionsEndpoint.getByDriverId(driverId);
  }
}
