import { VehicleDocument, VehicleDocumentData } from '../domain/model/vehicle-document.entity';
export class VehicleDocumentAssembler {
  toEntityFromResource(resource: VehicleDocumentData): VehicleDocument { return new VehicleDocument(resource); }
}
