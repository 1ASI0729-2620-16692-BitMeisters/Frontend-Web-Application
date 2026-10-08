import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { AssignedVehicle } from '../domain/model/assigned-vehicle.entity';
import { InspectionItem } from '../domain/model/inspection-item.entity';
import { Inspection } from '../domain/model/inspection.entity';
import { AssignedVehicleApiEndpoint } from './assigned-vehicle-api-endpoint';
import { AssignedVehicleAssembler } from './assigned-vehicle-assembler';
import { InspectionItemsApiEndpoint } from './inspection-items-api-endpoint';
import { InspectionsApiEndpoint } from './inspections-api-endpoint';

@Injectable({ providedIn: 'root' })
export class InspectionApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly inspectionsEndpoint = new InspectionsApiEndpoint(this.http);
  private readonly inspectionItemsEndpoint = new InspectionItemsApiEndpoint(this.http);
  private readonly assignedVehicleEndpoint = new AssignedVehicleApiEndpoint(
    this.http,
    new AssignedVehicleAssembler(),
  );

  getInspectionItems = (): Observable<InspectionItem[]> => this.inspectionItemsEndpoint.getAll();

  getInspection = (id: string): Observable<Inspection> => this.inspectionsEndpoint.getById(id);

  createInspection = (inspection: Inspection): Observable<Inspection> =>
    this.inspectionsEndpoint.create(inspection);

  updateInspection = (inspection: Inspection): Observable<Inspection> =>
    this.inspectionsEndpoint.update(inspection, inspection.id);

  getAssignedVehicle = (): Observable<AssignedVehicle> =>
    this.assignedVehicleEndpoint.getAssignedVehicle();
}
