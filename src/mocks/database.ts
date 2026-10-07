import { InspectionItemResource } from '../app/inspection/infrastructure/resources/inspection-item.resource';
import { InspectionResource } from '../app/inspection/infrastructure/resources/inspection.resource';
import { VehicleAssignmentResource } from '../app/inspection/infrastructure/resources/vehicle-assignment.resource';
import seed from './data/seed.json';

interface MockDatabase {
  inspectionItems: InspectionItemResource[];
  inspections: InspectionResource[];
  vehicleAssignments: VehicleAssignmentResource[];
}

function fromSeed(): MockDatabase {
  return structuredClone({
    inspectionItems: seed['inspection-items'],
    inspections: seed.inspections,
    vehicleAssignments: seed.vehicleAssignments,
  });
}

export const database: MockDatabase = fromSeed();

export function resetDatabase(): void {
  Object.assign(database, fromSeed());
}
