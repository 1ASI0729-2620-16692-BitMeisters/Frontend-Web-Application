import { AssignedVehicle } from '../../domain/model/valueobjects/assigned-vehicle';
import { VehicleAssignmentResource } from '../resources/vehicle-assignment.resource';

export class AssignedVehicleAssembler {
  static toValueObject(resource: VehicleAssignmentResource): AssignedVehicle {
    return new AssignedVehicle({
      vehicleId: resource.vehicle.id,
      plate: resource.vehicle.plate,
      brand: resource.vehicle.brand,
      model: resource.vehicle.model,
      type: resource.vehicle.type,
      assignedFrom: new Date(resource.assignedFrom),
    });
  }
}
