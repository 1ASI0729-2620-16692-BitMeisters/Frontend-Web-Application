import { Inspection } from '../../domain/model/aggregates/inspection.entity';
import { StartInspectionCommand } from '../../domain/model/commands/start-inspection.command';
import { Evidence, EvidenceMediaType } from '../../domain/model/entities/evidence.entity';
import { InspectionResultEntry } from '../../domain/model/entities/inspection-result-entry.entity';
import { Observation } from '../../domain/model/entities/observation.entity';
import { InspectionStatus } from '../../domain/model/valueobjects/inspection-status.enum';
import { ItemCategory } from '../../domain/model/valueobjects/item-category.enum';
import { ResultValue } from '../../domain/model/valueobjects/result-value.enum';
import { StartInspectionRequest } from '../requests/start-inspection.request';
import {
  EvidenceResource,
  InspectionResource,
  InspectionResultResource,
  ObservationResource,
} from '../resources/inspection.resource';

export class InspectionAssembler {
  static toEntity(resource: InspectionResource): Inspection {
    return new Inspection({
      id: resource.id,
      vehicleId: resource.vehicleId,
      driverId: resource.driverId,
      status: resource.status as InspectionStatus,
      odometer: resource.odometer,
      startedAt: new Date(resource.startedAt),
      completedAt: resource.completedAt ? new Date(resource.completedAt) : null,
      results: resource.results.map(InspectionAssembler.toResultEntry),
      createdAt: new Date(resource.createdAt),
      updatedAt: new Date(resource.updatedAt),
    });
  }

  static toStartRequest(command: StartInspectionCommand): StartInspectionRequest {
    return { odometer: command.odometer };
  }

  private static toResultEntry(resource: InspectionResultResource): InspectionResultEntry {
    return new InspectionResultEntry({
      id: resource.id,
      inspectionItemId: resource.inspectionItemId,
      itemName: resource.itemName,
      itemCategory: resource.itemCategory as ItemCategory,
      result: resource.result as ResultValue,
      createdAt: new Date(resource.createdAt),
      observations: resource.observations.map(InspectionAssembler.toObservation),
    });
  }

  private static toObservation(resource: ObservationResource): Observation {
    return new Observation({
      id: resource.id,
      description: resource.description,
      createdBy: resource.createdBy,
      createdAt: new Date(resource.createdAt),
      evidences: resource.evidences.map(InspectionAssembler.toEvidence),
    });
  }

  private static toEvidence(resource: EvidenceResource): Evidence {
    return new Evidence({
      id: resource.id,
      fileUrl: resource.fileUrl,
      mediaType: resource.mediaType as EvidenceMediaType,
      uploadedAt: new Date(resource.uploadedAt),
    });
  }
}
