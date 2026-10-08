import { AssignedVehicle } from '../domain/model/assigned-vehicle.entity';
import { VehicleAssignmentResponse } from './vehicle-assignment-response';

export class AssignedVehicleAssembler {
  toEntityFromResponse = (response: VehicleAssignmentResponse): AssignedVehicle =>
    new AssignedVehicle({
      id: response.id,
      vehicleId: response.vehicle.id,
      driverId: response.driverId,
      plate: response.vehicle.plate,
      brand: response.vehicle.brand,
      model: response.vehicle.model,
      type: response.vehicle.type,
      assignedFrom: new Date(response.assignedFrom),
    });
}
