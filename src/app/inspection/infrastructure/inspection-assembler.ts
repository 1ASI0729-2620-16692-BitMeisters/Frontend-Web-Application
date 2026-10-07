import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Evidence } from '../domain/model/evidence.entity';
import { InspectionResultEntry } from '../domain/model/inspection-result.entity';
import { Inspection } from '../domain/model/inspection.entity';
import { Observation } from '../domain/model/observation.entity';
import {
  EvidenceResource,
  InspectionResource,
  InspectionResultResource,
  InspectionsResponse,
  ObservationResource,
} from './inspections-response';

export class InspectionAssembler
  implements BaseAssembler<Inspection, InspectionResource, InspectionsResponse>
{
  toEntityFromResource(resource: InspectionResource): Inspection {
    const results = (resource.results ?? []).map((r) => this.toResultEntity(r));

    return new Inspection({
      id: resource.id,
      vehicleId: resource.vehicleId,
      driverId: resource.driverId,
      vehiclePlate: resource.vehiclePlate,
      driverName: resource.driverName,
      status: resource.status,
      odometer: resource.odometer,
      startedAt: resource.startedAt,
      completedAt: resource.completedAt,
      results,
      operatingCondition: resource.operatingCondition,
      failureReason: resource.failureReason,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
    });
  }

  toResourceFromEntity(entity: Inspection): InspectionResource {
    return {
      id: entity.id,
      vehicleId: entity.vehicleId,
      driverId: entity.driverId,
      vehiclePlate: entity.vehiclePlate,
      driverName: entity.driverName,
      status: entity.status,
      odometer: entity.odometer,
      startedAt: entity.startedAt,
      completedAt: entity.completedAt,
      results: entity.results.map((r) => this.toResultResource(r)),
      operatingCondition: entity.operatingCondition,
      failureReason: entity.failureReason,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toEntitiesFromResponse(response: InspectionsResponse): Inspection[] {
    return response.inspections.map((resource) => this.toEntityFromResource(resource));
  }

  private toResultEntity(resource: InspectionResultResource): InspectionResultEntry {
    let observation: Observation | undefined;
    if (resource.observation) {
      let evidence: Evidence | undefined;
      if (resource.observation.evidence) {
        evidence = new Evidence({
          id: resource.observation.evidence.id,
          photoUrl: resource.observation.evidence.photoUrl,
          capturedAt: resource.observation.evidence.capturedAt,
        });
      }
      observation = new Observation({
        id: resource.observation.id,
        notes: resource.observation.notes,
        evidence,
      });
    }

    return new InspectionResultEntry({
      id: resource.id,
      itemId: resource.itemId,
      itemName: resource.itemName,
      itemCategory: resource.itemCategory,
      isCriticalSafety: resource.isCriticalSafety,
      result: resource.result,
      observation,
    });
  }

  private toResultResource(entity: InspectionResultEntry): InspectionResultResource {
    let observationResource: ObservationResource | undefined;
    if (entity.observation) {
      let evidenceResource: EvidenceResource | undefined;
      if (entity.observation.evidence) {
        evidenceResource = {
          id: entity.observation.evidence.id,
          photoUrl: entity.observation.evidence.photoUrl,
          capturedAt: entity.observation.evidence.capturedAt,
        };
      }
      observationResource = {
        id: entity.observation.id,
        notes: entity.observation.notes,
        evidence: evidenceResource,
      };
    }

    return {
      id: entity.id,
      itemId: entity.itemId,
      itemName: entity.itemName,
      itemCategory: entity.itemCategory,
      isCriticalSafety: entity.isCriticalSafety,
      result: entity.result,
      observation: observationResource,
    };
  }
}
