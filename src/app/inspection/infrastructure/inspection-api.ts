import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../shared/infrastructure/http/api-client';
import { InspectionItem } from '../domain/model/aggregates/inspection-item.entity';
import { Inspection } from '../domain/model/aggregates/inspection.entity';
import { RegisterInspectionResultCommand } from '../domain/model/commands/register-inspection-result.command';
import { StartInspectionCommand } from '../domain/model/commands/start-inspection.command';
import { UpdateInspectionResultCommand } from '../domain/model/commands/update-inspection-result.command';
import { InspectionResultEntry } from '../domain/model/entities/inspection-result-entry.entity';
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

  registerResult(command: RegisterInspectionResultCommand): Observable<InspectionResultEntry> {
    return this.api.post(
      `/inspections/${command.inspectionId}/results`,
      InspectionAssembler.toRegisterResultRequest(command),
      InspectionAssembler.toResultEntry,
    );
  }

  updateResult(command: UpdateInspectionResultCommand): Observable<InspectionResultEntry> {
    return this.api.patch(
      `/inspections/${command.inspectionId}/results/${command.resultId}`,
      InspectionAssembler.toUpdateResultRequest(command),
      InspectionAssembler.toResultEntry,
    );
  }
}
