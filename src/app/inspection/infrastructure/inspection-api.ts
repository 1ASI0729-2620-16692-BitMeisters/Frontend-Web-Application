import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../shared/infrastructure/http/api-client';
import { InspectionItem } from '../domain/model/aggregates/inspection-item.entity';
import { Inspection } from '../domain/model/aggregates/inspection.entity';
import { StartInspectionCommand } from '../domain/model/commands/start-inspection.command';
import { AssignedVehicle } from '../domain/model/valueobjects/assigned-vehicle';
import { AssignedVehicleAssembler } from './assemblers/assigned-vehicle.assembler';
import { InspectionItemAssembler } from './assemblers/inspection-item.assembler';
import { InspectionAssembler } from './assemblers/inspection.assembler';

@Service()
export class InspectionApi {
  private readonly api = inject(ApiClient);

  getAssignedVehicle(): Observable<AssignedVehicle> {
    return this.api.get('/drivers/me/vehicle-assignment', AssignedVehicleAssembler.toValueObject);
  }

  getActiveInspectionItems(): Observable<InspectionItem[]> {
    return this.api.get('/inspection-items', InspectionItemAssembler.toEntities, {
      isActive: true,
    });
  }

  getInspection(id: string): Observable<Inspection> {
    return this.api.get(`/inspections/${id}`, InspectionAssembler.toEntity);
  }

  startInspection(command: StartInspectionCommand): Observable<Inspection> {
    return this.api.post(
      '/inspections',
      InspectionAssembler.toStartRequest(command),
      InspectionAssembler.toEntity,
    );
  }
}
